<template>
  <CardContainer title="Disease Keyword Cloud">
    <div class="cloud-wrapper">
      <div class="cloud-bg">
        <div class="grid-lines">
          <div v-for="i in 6" :key="i" class="grid-line"></div>
        </div>
      </div>
      <div class="cloud-content">
        <span class="main-keyword">{{ mainKeyword }}</span>
        <div class="sub-keywords">
          <span 
            v-for="(word, index) in subKeywords" 
            :key="index"
            class="sub-keyword"
            :style="{
              fontSize: word.size + 'px',
              color: word.color,
              animationDelay: word.delay + 's'
            }"
          >
            {{ word.name }}
          </span>
        </div>
      </div>
    </div>
  </CardContainer>
</template>

<script setup>
import { ref } from 'vue'
import CardContainer from './CardContainer.vue'

const mainKeyword = ref('Lumbar Disc Herniation')

const subKeywords = ref([
  { name: 'Hypertension', size: 14, color: '#4fc3f7', delay: 0 },
  { name: 'Cervical Spondylosis', size: 12, color: '#81c784', delay: 0.2 },
  { name: 'Gastritis', size: 13, color: '#fff176', delay: 0.4 },
  { name: 'Depression', size: 11, color: '#e57373', delay: 0.6 },
  { name: 'Fracture', size: 12, color: '#ba68c8', delay: 0.8 },
  { name: 'Diabetes', size: 14, color: '#64b5f6', delay: 1 },
  { name: 'Coronary Heart Disease', size: 11, color: '#ffb74d', delay: 1.2 }
])

// Expose update data method
const updateData = (main, sub) => {
  if (main) mainKeyword.value = main
  if (sub && Array.isArray(sub)) {
    subKeywords.value = sub.map((item, index) => ({
      name: item.name || '--',
      size: item.size || 12 + Math.random() * 4,
      color: item.color || '#4fc3f7',
      delay: index * 0.2
    }))
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.cloud-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.cloud-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.grid-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.3), transparent);
  transform-origin: left center;
}

.grid-line:nth-child(1) { transform: rotate(0deg); }
.grid-line:nth-child(2) { transform: rotate(30deg); }
.grid-line:nth-child(3) { transform: rotate(60deg); }
.grid-line:nth-child(4) { transform: rotate(90deg); }
.grid-line:nth-child(5) { transform: rotate(120deg); }
.grid-line:nth-child(6) { transform: rotate(150deg); }

.cloud-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.main-keyword {
  display: block;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-shadow: 
    0 0 20px rgba(0, 191, 255, 0.8),
    0 0 40px rgba(0, 191, 255, 0.4);
  margin-bottom: 20px;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.3);
  }
  to {
    text-shadow: 0 0 30px rgba(0, 191, 255, 1), 0 0 60px rgba(0, 191, 255, 0.6);
  }
}

.sub-keywords {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 20px;
  max-width: 300px;
  margin: 0 auto;
}

.sub-keyword {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
