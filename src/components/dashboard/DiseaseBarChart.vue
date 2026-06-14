<template>
  <CardContainer title="Disease Type Distribution">
    <div ref="chartRef" class="chart"></div>
  </CardContainer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import CardContainer from './CardContainer.vue'

const chartRef = ref(null)
let chartInstance = null

const diseaseData = [
  { name: 'Cervical Spondylosis', value: '--' },
  { name: 'Hypertension', value: '--' },
  { name: 'Depression', value: '--' },
  { name: 'Fracture', value: '--' },
  { name: 'Lumbar Disc Herniation', value: '--' },
  { name: 'Gastritis', value: '--' }
]

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c}',
      backgroundColor: 'rgba(10, 25, 47, 0.9)',
      borderColor: '#00bfff',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 60,
      axisLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.3)' } },
      axisTick: { show: false },
      axisLabel: { color: '#8899aa', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: diseaseData.map(d => d.name).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.3)' } },
      axisTick: { show: false },
      axisLabel: { 
        color: '#e0e0e0', 
        fontSize: 12,
        interval: 0
      },
      inverse: true
    },
    series: [{
      type: 'bar',
      data: diseaseData.map(d => d.value).reverse(),
      barWidth: '50%',
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#1976d2' },
          { offset: 1, color: '#00bfff' }
        ])
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{c}',
        color: '#fff',
        fontSize: 12
      }
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
      yAxis: { data: data.map(d => d.name).reverse() },
      series: [{ data: data.map(d => d.value).reverse() }]
    })
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.chart {
  width: 100%;
  min-height: 300px;
}
</style>
