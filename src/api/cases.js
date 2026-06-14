import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 后端API地址
  timeout: 10000
})

// 获取所有病例数据
export const getCases = (params) => {
  return api.get('/cases', { params })
}

// 获取病例统计信息
export const getCasesStats = () => {
  return api.get('/cases/stats')
}

// 获取病例列表（分页）
export const getCasesList = (page, pageSize, filters = {}) => {
  return api.get('/cases/list', {
    params: { page, pageSize, ...filters }
  })
}

// 获取疾病类型分布
export const getDiseaseDistribution = () => {
  return api.get('/cases/disease-distribution')
}

// 获取年龄段分布
export const getAgeDistribution = () => {
  return api.get('/cases/age-distribution')
}

// 获取性别分布
export const getGenderDistribution = () => {
  return api.get('/cases/gender-distribution')
}

// 获取科室分布
export const getDepartmentDistribution = () => {
  return api.get('/cases/department-distribution')
}

// 获取热门医院
export const getTopHospitals = () => {
  return api.get('/cases/top-hospitals')
}

export default api
