<template>
  <CardContainer title="Visualization Platform">
    <div class="info-cards-grid">
      <div 
        v-for="(card, index) in cardsData" 
        :key="index"
        class="info-card"
      >
        <div class="card-value">{{ card.value }}</div>
        <div class="card-label">{{ card.label }}</div>
      </div>
    </div>
  </CardContainer>
</template>

<script setup>
import { ref } from 'vue'
import CardContainer from './CardContainer.vue'

const cardsData = ref([
  { label: 'Total Records', value: '--' },
  { label: 'Top Disease', value: '--' },
  { label: 'Top Department', value: '--' },
  { label: 'Max Patient Age', value: '--' },
  { label: 'Min Patient Age', value: '--' },
  { label: 'Popular Hospital', value: '--' }
])

// Expose update data method
const updateData = (data) => {
  if (data) {
    if (data.totalCount !== undefined) cardsData.value[0].value = data.totalCount
    if (data.topDisease) cardsData.value[1].value = data.topDisease
    if (data.topDept) cardsData.value[2].value = data.topDept
    if (data.maxAge !== undefined) cardsData.value[3].value = data.maxAge
    if (data.minAge !== undefined) cardsData.value[4].value = data.minAge
    if (data.topHospital) cardsData.value[5].value = data.topHospital
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 12px;
}

.info-card {
  background: linear-gradient(135deg, rgba(26, 90, 138, 0.6) 0%, rgba(13, 58, 94, 0.8) 100%);
  border: 1px solid rgba(0, 191, 255, 0.4);
  border-radius: 6px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  min-height: 70px;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0, 191, 255, 0.08) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
  border-radius: inherit;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.card-value {
  font-size: 20px;
  font-weight: bold;
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  margin-bottom: 6px;
  z-index: 1;
  line-height: 1.2;
  word-break: break-all;
}

.card-label {
  font-size: 11px;
  color: #b8d4e8;
  text-align: center;
  z-index: 1;
  line-height: 1.4;
}
</style>
