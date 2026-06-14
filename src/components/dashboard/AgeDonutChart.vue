<template>
  <CardContainer title="Disease Ratio by Age Group">
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart"></div>
      <div class="legend">
        <div 
          v-for="(item, index) in legendData" 
          :key="index"
          class="legend-item"
        >
          <span class="legend-color" :style="{ background: item.color }"></span>
          <span class="legend-text">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </CardContainer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import CardContainer from './CardContainer.vue'

const chartRef = ref(null)
let chartInstance = null

const legendData = [
  { name: '0-10 y/o', color: '#4fc3f7' },
  { name: '10-20 y/o', color: '#e57373' },
  { name: '20-30 y/o', color: '#ff8a65' },
  { name: '30-40 y/o', color: '#fff176' },
  { name: '40-50 y/o', color: '#81c784' },
  { name: '50-60 y/o', color: '#64b5f6' },
  { name: '60+ y/o', color: '#ffb74d' }
]

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)',
      backgroundColor: 'rgba(10, 25, 47, 0.9)',
      borderColor: '#00bfff',
      textStyle: { color: '#fff' }
    },
    legend: {
      show: false
    },
    series: [{
      name: 'Disease Ratio by Age',
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#0a192f',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}',
        color: '#e0e0e0',
        fontSize: 11
      },
      labelLine: {
        show: true,
        lineStyle: { color: 'rgba(0, 191, 255, 0.5)' }
      },
      data: legendData.map((item, index) => ({
        name: item.name,
        value: '--',
        itemStyle: { color: item.color }
      }))
    }]
  }
  
  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})

// Expose update data method
const updateData = (data) => {
  if (chartInstance && data) {
    chartInstance.setOption({
      series: [{
        data: data.map((item, index) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: legendData[index]?.color || '#00bfff' }
        }))
      }]
    })
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  flex-direction: column;
}

.chart {
  flex: 1;
  min-height: 180px;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 16px;
  padding-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-text {
  font-size: 12px;
  color: #b8d4e8;
}
</style>
