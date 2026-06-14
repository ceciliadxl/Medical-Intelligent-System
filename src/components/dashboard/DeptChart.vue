<template>
  <CardContainer title="Hospital Department Rose Chart">
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
  { name: 'Psychiatry', color: '#ba68c8' },
  { name: 'Cardiology', color: '#81c784' },
  { name: 'General Internal Medicine', color: '#fff176' },
  { name: 'Spine Surgery', color: '#e57373' },
  { name: 'Emergency', color: '#4fc3f7' }
]

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
      backgroundColor: 'rgba(10, 25, 47, 0.9)',
      borderColor: '#00bfff',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'pie',
      radius: ['25%', '70%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5,
        borderColor: '#0a192f',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 11,
        color: '#b8d4e8'
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
  gap: 8px 12px;
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
