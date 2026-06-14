<template>
  <div class="data-table-page">
    <!-- Navigation button -->
    <div class="nav-buttons">
      <el-button type="primary" @click="goToDashboard">
        <el-icon><DataAnalysis /></el-icon>
        Dashboard
      </el-button>
    </div>

    <div class="page-container">
      <h1 class="page-title">
        <span>Patient Data Analysis - Data Table</span>
      </h1>

      <!-- Filter section -->
      <div class="filter-section">
        <el-card class="filter-card">
          <el-form :inline="true" :model="filterForm">
            <el-form-item label="Disease Type">
              <el-select v-model="filterForm.type" placeholder="All" clearable>
                <el-option label="All" value="" />
                <el-option label="Hypertension" value="Hypertension" />
                <el-option label="Cold" value="Cold" />
                <el-option label="Fracture" value="Fracture" />
                <el-option label="Cervical Spondylosis" value="Cervical Spondylosis" />
                <el-option label="Lumbar Disc Herniation" value="Lumbar Disc Herniation" />
                <el-option label="Gastritis" value="Gastritis" />
                <el-option label="Depression" value="Depression" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Gender">
              <el-select v-model="filterForm.gender" placeholder="All" clearable>
                <el-option label="All" value="" />
                <el-option label="Male" value="Male" />
                <el-option label="Female" value="Female" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Age Range">
              <el-input-number v-model="filterForm.minAge" :min="0" :max="100" placeholder="Min" />
              <span style="margin: 0 10px; color: #a0cfff;">~</span>
              <el-input-number v-model="filterForm.maxAge" :min="0" :max="100" placeholder="Max" />
            </el-form-item>
            
            <el-form-item label="Keyword">
              <el-input v-model="filterForm.keyword" placeholder="Search description" clearable />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="handleSearch">
                <el-icon><Search /></el-icon>
                Search
              </el-button>
              <el-button @click="handleReset">
                <el-icon><Refresh /></el-icon>
                Reset
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <!-- Data table -->
      <div class="table-section">
        <el-card class="table-card">
          <template #header>
            <div class="table-header">
              <span>Patient Case List</span>
              <span class="total-count">Total {{ total }} records</span>
            </div>
          </template>
          
          <el-table 
            :data="tableData" 
            stripe 
            border 
            :height="tableHeight"
            v-loading="loading"
            style="width: 100%"
          >
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column prop="type" label="Type" width="120" align="center">
              <template #default="{ row }">
                <el-tag :type="getTypeColor(row.type)" effect="dark">
                  {{ row.type }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="Gender" width="80" align="center">
              <template #default="{ row }">
                <el-tag :type="row.gender === 'Male' ? 'primary' : 'danger'" plain>
                  {{ row.gender }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="Age" width="80" align="center" />
            <el-table-column prop="time" label="Time" width="100" align="center" />
            <el-table-column prop="content" label="Description" min-width="200" show-overflow-tooltip />
            <el-table-column prop="docName" label="Doctor" width="120" align="center" />
            <el-table-column prop="docHospital" label="Hospital" width="180" show-overflow-tooltip />
            <el-table-column prop="department" label="Department" width="120" align="center" />
            <el-table-column label="Detail" width="80" align="center">
              <template #default="{ row }">
                <el-button link type="primary" @click="viewDetail(row)">
                  View
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="height" label="Height(cm)" width="100" align="center" />
            <el-table-column prop="weight" label="Weight(kg)" width="100" align="center" />
            <el-table-column prop="illDuration" label="Ill Duration" width="120" align="center" />
            <el-table-column prop="allergy" label="Allergy" width="100" align="center">
              <template #default="{ row }">
                <span :class="row.allergy !== 'None' ? 'allergy-warning' : ''">
                  {{ row.allergy }}
                </span>
              </template>
            </el-table-column>
          </el-table>

          <!-- Pagination -->
          <div class="pagination-container">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </div>
    </div>

    <!-- Detail dialog -->
    <el-dialog
      v-model="detailDialogVisible"
      title="Case Details"
      width="800px"
      :destroy-on-close="true"
    >
      <div class="detail-content" v-if="currentCase">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="ID">{{ currentCase.id }}</el-descriptions-item>
          <el-descriptions-item label="Disease Type">
            <el-tag :type="getTypeColor(currentCase.type)" effect="dark">
              {{ currentCase.type }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Gender">{{ currentCase.gender }}</el-descriptions-item>
          <el-descriptions-item label="Age">{{ currentCase.age }} y/o</el-descriptions-item>
          <el-descriptions-item label="Height">{{ currentCase.height }}cm</el-descriptions-item>
          <el-descriptions-item label="Weight">{{ currentCase.weight }}kg</el-descriptions-item>
          <el-descriptions-item label="Ill Duration" :span="2">{{ currentCase.illDuration }}</el-descriptions-item>
          <el-descriptions-item label="Allergy" :span="2">
            <span :class="currentCase.allergy !== 'None' ? 'allergy-warning' : ''">
              {{ currentCase.allergy }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="Doctor">{{ currentCase.docName }}</el-descriptions-item>
          <el-descriptions-item label="Department">{{ currentCase.department }}</el-descriptions-item>
          <el-descriptions-item label="Hospital" :span="2">{{ currentCase.docHospital }}</el-descriptions-item>
          <el-descriptions-item label="Description" :span="2">
            <div class="content-text">{{ currentCase.content }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { mockCasesData } from '../api/mockData.js'

const router = useRouter()

// Filter form
const filterForm = reactive({
  type: '',
  gender: '',
  minAge: null,
  maxAge: null,
  keyword: ''
})

// Table data
const tableData = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const tableHeight = ref(600)

// Detail dialog
const detailDialogVisible = ref(false)
const currentCase = ref(null)

// Initialize
onMounted(() => {
  loadData()
  calculateTableHeight()
  window.addEventListener('resize', calculateTableHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateTableHeight)
})

// Calculate table height
const calculateTableHeight = () => {
  tableHeight.value = window.innerHeight - 380
}

// Load data
const loadData = async () => {
  loading.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Simulate pagination and filtering
  let filteredData = [...mockCasesData]
  
  // Apply filters
  if (filterForm.type) {
    filteredData = filteredData.filter(item => item.type === filterForm.type)
  }
  if (filterForm.gender) {
    filteredData = filteredData.filter(item => item.gender === filterForm.gender)
  }
  if (filterForm.minAge) {
    filteredData = filteredData.filter(item => parseInt(item.age) >= filterForm.minAge)
  }
  if (filterForm.maxAge) {
    filteredData = filteredData.filter(item => parseInt(item.age) <= filterForm.maxAge)
  }
  if (filterForm.keyword) {
    filteredData = filteredData.filter(item => 
      item.content.toLowerCase().includes(filterForm.keyword.toLowerCase())
    )
  }
  
  total.value = filteredData.length
  
  // Paginate
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  tableData.value = filteredData.slice(start, end)
  
  loading.value = false
}

// Search
const handleSearch = () => {
  currentPage.value = 1
  loadData()
}

// Reset
const handleReset = () => {
  filterForm.type = ''
  filterForm.gender = ''
  filterForm.minAge = null
  filterForm.maxAge = null
  filterForm.keyword = ''
  currentPage.value = 1
  loadData()
}

// Page size change
const handleSizeChange = (val) => {
  pageSize.value = val
  loadData()
}

// Current page change
const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

// View detail
const viewDetail = (row) => {
  currentCase.value = row
  detailDialogVisible.value = true
}

// Get disease type color
const getTypeColor = (type) => {
  const colorMap = {
    'Hypertension': 'danger',
    'Cold': 'warning',
    'Fracture': 'success',
    'Cervical Spondylosis': 'info',
    'Lumbar Disc Herniation': 'primary',
    'Gastritis': 'danger',
    'Depression': 'warning'
  }
  return colorMap[type] || ''
}

// Navigate to dashboard
const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style lang="scss" scoped>
.data-table-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%);
  padding: 20px;
  
  .nav-buttons {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .page-container {
    max-width: 1800px;
    margin: 0 auto;
    padding-top: 40px;
  }
  
  .filter-card {
    background: rgba(10, 30, 60, 0.8);
    border: 1px solid rgba(0, 212, 255, 0.3);
    margin-bottom: 20px;
    
    :deep(.el-card__body) {
      padding: 20px;
    }
    
    :deep(.el-form-item__label) {
      color: #a0cfff;
    }
    
    :deep(.el-input__wrapper) {
      background: rgba(0, 20, 50, 0.5);
      border: 1px solid rgba(0, 212, 255, 0.3);
    }
    
    :deep(.el-select) {
      width: 150px;
    }
  }
  
  .table-card {
    background: rgba(10, 30, 60, 0.8);
    border: 1px solid rgba(0, 212, 255, 0.3);
    
    :deep(.el-card__header) {
      background: rgba(0, 212, 255, 0.1);
      border-bottom: 1px solid rgba(0, 212, 255, 0.3);
    }
    
    :deep(.el-table) {
      --el-table-bg-color: transparent;
      --el-table-tr-bg-color: transparent;
      --el-table-header-bg-color: rgba(0, 212, 255, 0.1);
      --el-table-row-hover-bg-color: rgba(0, 212, 255, 0.05);
      --el-table-border-color: rgba(0, 212, 255, 0.2);
      --el-table-text-color: #e0e0e0;
      --el-table-header-text-color: #00d4ff;
    }
    
    :deep(.el-table__header th) {
      background: rgba(0, 212, 255, 0.1) !important;
    }
    
    :deep(.el-table__body tr) {
      &:hover > td {
        background: rgba(0, 212, 255, 0.05) !important;
      }
    }
  }
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #00d4ff;
    font-size: 16px;
    
    .total-count {
      font-size: 14px;
      color: #a0cfff;
    }
  }
  
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 20px 0;
    
    :deep(.el-pagination) {
      --el-pagination-bg-color: transparent;
      --el-pagination-text-color: #a0cfff;
      --el-pagination-button-bg-color: rgba(0, 212, 255, 0.1);
      --el-pagination-hover-color: #00d4ff;
      
      .el-pager li {
        background: rgba(0, 212, 255, 0.1);
        color: #a0cfff;
        
        &.is-active {
          background: linear-gradient(135deg, #00d4ff, #0066ff);
          color: #fff;
        }
        
        &:hover {
          color: #00d4ff;
        }
      }
    }
  }
  
  .allergy-warning {
    color: #f56c6c;
    font-weight: bold;
  }
  
  .detail-content {
    :deep(.el-descriptions__label) {
      background: rgba(0, 212, 255, 0.1);
      color: #00d4ff;
    }
    
    :deep(.el-descriptions__content) {
      background: rgba(10, 30, 60, 0.5);
      color: #e0e0e0;
    }
    
    .content-text {
      line-height: 1.8;
      text-align: justify;
    }
  }
}

.page-title {
  font-size: 28px;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  
  span {
    background: linear-gradient(135deg, #00d4ff, #0066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>
