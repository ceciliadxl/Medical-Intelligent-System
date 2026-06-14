<template>
  <div class="glow-card dashboard-card">
    <div class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-body">
      <div ref="chartRef" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, markRaw } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: '水平条形图'
  },
  data: {
    type: Array,
    default: () => []
  },
  xAxisData: {
    type: Array,
    default: () => [0, 12, 24, 36, 48, 60]
  },
  config: {
    type: Object,
    default: () => ({
      barWidth: 15,
      gradientColors: ['#00bfff', '#69c0ff']
    })
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = markRaw(echarts.init(chartRef.value))
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c}'
    },
    grid: {
      left: '3%',
      right: '18%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      data: props.xAxisData,
      axisLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.3)' } },
      axisLabel: { color: '#e0e0e0', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: props.data.map(item => item.name),
      axisLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.3)' } },
      axisLabel: { color: '#e0e0e0', fontSize: 11 }
    },
    series: [{
      name: props.title,
      type: 'bar',
      data: props.data.map(item => item.value),
      itemStyle: {
        borderRadius: [0, 5, 5, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: props.config.gradientColors[0] },
          { offset: 1, color: props.config.gradientColors[1] }
        ])
      },
      label: {
        show: true,
        position: 'right',
        color: '#00bfff',
        fontWeight: 'bold',
        fontSize: 11
      },
      barWidth: props.config.barWidth
    }]
  }
  
  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

watch(() => props.data, () => {
  initChart()
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})

defineExpose({ chartInstance })
</script>

<style lang="scss" scoped>
.glow-card {
  background: rgba(10, 30, 60, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 191, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.2), inset 0 0 20px rgba(0, 191, 255, 0.05);
  overflow: hidden;

  &:hover {
    border-color: rgba(0, 191, 255, 0.8);
    box-shadow: 0 0 25px rgba(0, 191, 255, 0.3), inset 0 0 30px rgba(0, 191, 255, 0.08);
  }

  .card-header {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0, 191, 255, 0.3);
    background: rgba(0, 191, 255, 0.05);

    h3 {
      margin: 0;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .card-body {
    padding: 15px;
  }

  .chart-container {
    width: 100%;
    height: 250px;
  }
}
</style>
