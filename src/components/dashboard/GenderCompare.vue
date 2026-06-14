<template>
  <CardContainer title="Gender Disease Comparison">
    <div class="gender-compare">
      <!-- Left pie chart -->
      <div class="pie-wrapper left">
        <div ref="leftPieRef" class="pie-chart"></div>
        <div class="pie-label">Male</div>
      </div>
      
      <!-- Center percentage -->
      <div class="center-card">
        <div class="percent-value">{{ percent }}%</div>
        <div class="percent-label">vs</div>
      </div>
      
      <!-- Right pie chart -->
      <div class="pie-wrapper right">
        <div ref="rightPieRef" class="pie-chart"></div>
        <div class="pie-label">Female</div>
      </div>
    </div>
  </CardContainer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import CardContainer from './CardContainer.vue'

const props = defineProps({
  percent: {
    type: [String, Number],
    default: '--'
  }
})

const leftPieRef = ref(null)
const rightPieRef = ref(null)
let leftChart = null
let rightChart = null

const chartColors = ['#4fc3f7', '#81c784', '#fff176', '#ff8a65', '#e57373', '#ba68c8', '#64b5f6']

const initCharts = () => {
  const commonOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
      backgroundColor: 'rgba(10, 25, 47, 0.9)',
      borderColor: '#00bfff',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      data: [
        { value: '--', name: 'Depression', itemStyle: { color: chartColors[0] } },
        { value: '--', name: 'Other', itemStyle: { color: chartColors[1] } }
      ],
      label: { show: false },
      itemStyle: {
        borderRadius: 4,
        borderColor: '#0a192f',
        borderWidth: 2
      }
    }]
  }
  
  if (leftPieRef.value) {
    leftChart = echarts.init(leftPieRef.value)
    leftChart.setOption(commonOption)
  }
  
  if (rightPieRef.value) {
    rightChart = echarts.init(rightPieRef.value)
    rightChart.setOption(commonOption)
  }
}

const handleResize = () => {
  leftChart?.resize()
  rightChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  leftChart?.dispose()
  rightChart?.dispose()
})

// Expose update data method
const updateData = (maleData, femaleData, percent) => {
  if (leftChart && maleData) {
    leftChart.setOption({
      series: [{ data: maleData }]
    })
  }
  if (rightChart && femaleData) {
    rightChart.setOption({
      series: [{ data: femaleData }]
    })
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.gender-compare {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 300px;
  padding: 10px 0;
}

.pie-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
}

.pie-chart {
  width: 100%;
  height: 120px;
}

.pie-label {
  font-size: 14px;
  color: #b8d4e8;
  margin-top: 8px;
}

.center-card {
  background: linear-gradient(135deg, rgba(0, 100, 150, 0.6) 0%, rgba(0, 60, 100, 0.8) 100%);
  border: 2px solid #00bfff;
  border-radius: 8px;
  padding: 16px 24px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.4);
}

.percent-value {
  font-size: 32px;
  font-weight: bold;
  color: #00d4ff;
  text-shadow: 0 0 15px rgba(0, 212, 255, 0.7);
}

.percent-label {
  font-size: 12px;
  color: #b8d4e8;
  margin-top: 4px;
}
</style>
