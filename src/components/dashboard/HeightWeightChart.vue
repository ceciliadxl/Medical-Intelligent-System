<template>
  <CardContainer title="Average Height & Weight by Disease">
    <div ref="chartRef" class="chart"></div>
  </CardContainer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import CardContainer from './CardContainer.vue'

const chartRef = ref(null)
let chartInstance = null

const xAxisData = ['Fracture', 'Depression', 'Hypertension', 'Cervical Spondylosis', 'Gastritis', 'Lumbar Disc Herniation']

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(10, 25, 47, 0.9)',
      borderColor: '#00bfff',
      textStyle: { color: '#fff' },
      formatter: function(params) {
        let result = params[0].name + '<br/>'
        params.forEach(item => {
          const unit = item.seriesName === 'Height' ? 'cm' : 'kg'
          result += item.marker + item.seriesName + ': ' + item.value + unit + '<br/>'
        })
        return result
      }
    },
    legend: {
      data: ['Height', 'Weight'],
      textStyle: { color: '#e0e0e0' },
      top: 0
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.3)' } },
      axisTick: { show: false },
      axisLabel: { 
        color: '#e0e0e0', 
        fontSize: 11,
        interval: 0,
        rotate: 0
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Weight(kg)',
        min: 0,
        max: 70,
        position: 'left',
        axisLine: { lineStyle: { color: '#4fc3f7' } },
        axisLabel: { color: '#b8d4e8', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(0, 191, 255, 0.1)' } }
      },
      {
        type: 'value',
        name: 'Height(cm)',
        min: 0,
        max: 180,
        position: 'right',
        axisLine: { lineStyle: { color: '#ffb74d' } },
        axisLabel: { color: '#b8d4e8', fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Weight',
        type: 'bar',
        yAxisIndex: 0,
        data: ['--', '--', '--', '--', '--', '--'],
        barWidth: '35%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4fc3f7' },
            { offset: 1, color: '#1976d2' }
          ])
        }
      },
      {
        name: 'Height',
        type: 'line',
        yAxisIndex: 1,
        data: ['--', '--', '--', '--', '--', '--'],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { 
          color: '#ffb74d', 
          width: 2,
          shadowColor: 'rgba(255, 183, 77, 0.5)',
          shadowBlur: 10
        },
        itemStyle: {
          color: '#fff',
          borderColor: '#ffb74d',
          borderWidth: 2
        }
      }
    ]
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
      xAxis: { data: data.diseases || xAxisData },
      series: [
        { data: data.weights || [] },
        { data: data.heights || [] }
      ]
    })
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.chart {
  width: 100%;
  min-height: 350px;
}
</style>
