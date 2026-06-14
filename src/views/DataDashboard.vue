<template>
  <div class="dashboard">
    <!-- Background decoration -->
    <div class="bg-decoration">
      <div class="grid-overlay"></div>
    </div>
    
    <!-- Top navigation bar -->
    <HeaderNav />
    
    <!-- Main content area -->
    <main class="main-content">
      <!-- Left column -->
      <aside class="left-column">
        <div class="chart-block top">
          <AgeDonutChart ref="ageChart" />
        </div>
        <div class="chart-block middle">
          <DiseaseBarChart ref="diseaseChart" />
        </div>
        <div class="chart-block bottom">
          <CaseTable ref="caseTable" />
        </div>
      </aside>
      
      <!-- Center column -->
      <section class="center-column">
        <div class="chart-block top">
          <InfoCards ref="infoCards" />
        </div>
        <div class="chart-block center">
          <GenderCompare ref="genderCompare" :percent="genderPercent" />
        </div>
        <div class="chart-block bottom">
          <HeightWeightChart ref="heightWeightChart" />
        </div>
      </section>
      
      <!-- Right column -->
      <aside class="right-column">
        <div class="chart-block top">
          <DeptChart ref="deptChart" />
        </div>
        <div class="chart-block bottom">
          <KeywordCloud ref="keywordCloud" />
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import HeaderNav from '@/components/dashboard/HeaderNav.vue'
import AgeDonutChart from '@/components/dashboard/AgeDonutChart.vue'
import DiseaseBarChart from '@/components/dashboard/DiseaseBarChart.vue'
import CaseTable from '@/components/dashboard/CaseTable.vue'
import InfoCards from '@/components/dashboard/InfoCards.vue'
import GenderCompare from '@/components/dashboard/GenderCompare.vue'
import HeightWeightChart from '@/components/dashboard/HeightWeightChart.vue'
import DeptChart from '@/components/dashboard/DeptChart.vue'
import KeywordCloud from '@/components/dashboard/KeywordCloud.vue'
import { getDashboardData } from '@/api/dashboardApi.js'

// Component refs
const ageChart = ref(null)
const diseaseChart = ref(null)
const caseTable = ref(null)
const infoCards = ref(null)
const genderCompare = ref(null)
const heightWeightChart = ref(null)
const deptChart = ref(null)
const keywordCloud = ref(null)

// Gender comparison percentage
const genderPercent = ref('--')

// Load data
const loadData = async () => {
  try {
    const data = await getDashboardData()
    
    // Update each component with data
    if (data.ageDistribution && ageChart.value) {
      ageChart.value.updateData(data.ageDistribution)
    }
    
    if (data.diseaseDistribution && diseaseChart.value) {
      diseaseChart.value.updateData(data.diseaseDistribution)
    }
    
    if (data.caseList && caseTable.value) {
      caseTable.value.updateData(data.caseList)
    }
    
    if (data.summary && infoCards.value) {
      infoCards.value.updateData(data.summary)
    }
    
    if (data.genderCompare && genderCompare.value) {
      genderCompare.value.updateData(data.genderCompare.male, data.genderCompare.female, data.genderCompare.percent)
      genderPercent.value = data.genderCompare.percent || '--'
    }
    
    if (data.heightWeight && heightWeightChart.value) {
      heightWeightChart.value.updateData(data.heightWeight)
    }
    
    if (data.departmentDistribution && deptChart.value) {
      deptChart.value.updateData(data.departmentDistribution)
    }
    
    if (data.keywords && keywordCloud.value) {
      keywordCloud.value.updateData(data.keywords.main, data.keywords.sub)
    }
  } catch (error) {
    console.warn('Failed to load data, using default placeholder data:', error)
  }
}

onMounted(() => {
  loadData()
})

// Provide refresh method to child components
provide('refreshData', loadData)
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #0d2137 50%, #0a192f 100%);
  overflow-y: auto;
  overflow-x: hidden;
}

/* Background decoration */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Main content area */
.main-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: stretch;
  padding: 100px 20px 40px 20px;
  min-height: calc(100vh - 100px);
  box-sizing: border-box;
}

/* Three-column layout */
.left-column,
.center-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.left-column {
  width: 30%;
  padding-right: 10px;
}

.center-column {
  width: 40%;
  padding: 0 10px;
}

.right-column {
  width: 30%;
  padding-left: 10px;
}

/* Chart blocks */
.chart-block {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Last block in each column fills remaining space, keeping bottoms aligned */
.left-column .chart-block:last-child,
.center-column .chart-block:last-child,
.right-column .chart-block:last-child {
  flex: 1;
  min-height: 200px;
}

/* Left column: Age donut, disease bar, case table */
.left-column .chart-block:nth-child(1) { min-height: 300px; }
.left-column .chart-block:nth-child(2) { min-height: 400px; }

/* Center column: Info cards, gender compare, height-weight */
.center-column .chart-block:nth-child(1) { min-height: 320px; }
.center-column .chart-block:nth-child(2) { min-height: 210px; }

/* Right column: Department rose, keyword cloud */
.right-column .chart-block:nth-child(1) { min-height: 320px; }
</style>
