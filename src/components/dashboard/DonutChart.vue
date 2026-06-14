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
    default: '环形饼图'
  },
  data: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: () => ({
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#ffa94d', '#722ed1']
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
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      textStyle: { color: '#e0e0e0', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8
    },
    series: [{
      name: props.title,
      type: 'pie',
      radius: props.config.radius,
      center: props.config.center,
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
        borderColor: '#0a192f',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}',
        color: '#e0e0e0',
        fontSize: 10
      },
      emphasis: {
        label: { show: true, fontSize: 12, fontWeight: 'bold' }
      },
      labelLine: { show: true },
      data: props.data
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
    height: 200px;
  }
}
</style>
