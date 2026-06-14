import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
const PORT = 8080

// 中间件
app.use(cors())
app.use(express.json())

// 数据库连接
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // 根据实际情况修改
  database: 'medicalinfo'
}

let pool

// 初始化数据库连接池
const initDB = async () => {
  try {
    pool = mysql.createPool(dbConfig)
    console.log('数据库连接成功')
  } catch (error) {
    console.error('数据库连接失败:', error)
  }
}

// 获取所有病例
app.get('/api/cases', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cases ORDER BY id DESC')
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取病例列表（分页）
app.get('/api/cases/list', async (req, res) => {
  try {
    const { page = 1, pageSize = 20, type, gender, minAge, maxAge, keyword } = req.query
    const offset = (page - 1) * pageSize
    
    let whereClause = '1=1'
    const params = []
    
    if (type) {
      whereClause += ' AND type = ?'
      params.push(type)
    }
    if (gender) {
      whereClause += ' AND gender = ?'
      params.push(gender)
    }
    if (minAge) {
      whereClause += ' AND CAST(age AS UNSIGNED) >= ?'
      params.push(parseInt(minAge))
    }
    if (maxAge) {
      whereClause += ' AND CAST(age AS UNSIGNED) <= ?'
      params.push(parseInt(maxAge))
    }
    if (keyword) {
      whereClause += ' AND content LIKE ?'
      params.push(`%${keyword}%`)
    }
    
    // 获取总数
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM cases WHERE ${whereClause}`,
      params
    )
    const total = countResult[0].total
    
    // 获取数据
    const [rows] = await pool.query(
      `SELECT * FROM cases WHERE ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(pageSize), parseInt(offset)]
    )
    
    res.json({
      success: true,
      data: rows,
      total: total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取疾病类型分布
app.get('/api/cases/disease-distribution', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT type as name, COUNT(*) as value 
      FROM cases 
      GROUP BY type 
      ORDER BY value DESC
    `)
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取年龄段分布
app.get('/api/cases/age-distribution', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        CASE 
          WHEN CAST(age AS UNSIGNED) BETWEEN 0 AND 18 THEN '0-18岁'
          WHEN CAST(age AS UNSIGNED) BETWEEN 19 AND 30 THEN '19-30岁'
          WHEN CAST(age AS UNSIGNED) BETWEEN 31 AND 45 THEN '31-45岁'
          WHEN CAST(age AS UNSIGNED) BETWEEN 46 AND 60 THEN '46-60岁'
          ELSE '60岁以上'
        END as name,
        COUNT(*) as value
      FROM cases 
      GROUP BY name
      ORDER BY name
    `)
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取性别分布
app.get('/api/cases/gender-distribution', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT gender as name, COUNT(*) as value 
      FROM cases 
      GROUP BY gender
    `)
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取科室分布
app.get('/api/cases/department-distribution', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT department as name, COUNT(*) as value 
      FROM cases 
      GROUP BY department 
      ORDER BY value DESC
      LIMIT 10
    `)
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取热门医院
app.get('/api/cases/top-hospitals', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT docHospital as name, COUNT(*) as value 
      FROM cases 
      GROUP BY docHospital 
      ORDER BY value DESC
      LIMIT 10
    `)
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 获取统计数据
app.get('/api/cases/stats', async (req, res) => {
  try {
    // 数据总量
    const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM cases')
    const total = totalResult[0].total
    
    // 最多疾病类型
    const [diseaseResult] = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM cases 
      GROUP BY type 
      ORDER BY count DESC 
      LIMIT 1
    `)
    const topDisease = diseaseResult[0]?.type || ''
    
    // 求诊最多科室
    const [deptResult] = await pool.query(`
      SELECT department, COUNT(*) as count 
      FROM cases 
      GROUP BY department 
      ORDER BY count DESC 
      LIMIT 1
    `)
    const topDept = deptResult[0]?.department || ''
    
    // 最大/最小年龄
    const [ageResult] = await pool.query(`
      SELECT MAX(CAST(age AS UNSIGNED)) as maxAge, MIN(CAST(age AS UNSIGNED)) as minAge 
      FROM cases
    `)
    
    // 热门医院
    const [hospitalResult] = await pool.query(`
      SELECT docHospital, COUNT(*) as count 
      FROM cases 
      GROUP BY docHospital 
      ORDER BY count DESC 
      LIMIT 1
    `)
    const topHospital = hospitalResult[0]?.docHospital || ''
    
    res.json({
      success: true,
      data: {
        total,
        topDisease,
        topDept,
        maxAge: ageResult[0]?.maxAge || 0,
        minAge: ageResult[0]?.minAge || 0,
        topHospital
      }
    })
  } catch (error) {
    console.error('查询失败:', error)
    res.status(500).json({ success: false, message: '查询失败' })
  }
})

// 启动服务器
app.listen(PORT, async () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
  await initDB()
})
