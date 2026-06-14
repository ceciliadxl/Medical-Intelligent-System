<template>
  <header class="header-nav">
    <div class="nav-bg"></div>
    <div class="nav-content">
      <!-- Left: Title + Time -->
      <div class="nav-left">
        <div class="nav-title">
          <span class="title-icon">◈</span>
          Medical AI Data Analysis & Visualization System
        </div>
        <div class="nav-time">
          <span class="time-icon">◑</span>
          {{ currentTime }}
        </div>
      </div>
      
      <!-- Right: Navigation buttons -->
      <nav class="nav-buttons">
        <a 
          v-for="(btn, index) in navButtons" 
          :key="index"
          class="nav-btn"
          :class="{ active: activeIndex === index }"
          @click="handleClick(btn.path, index)"
        >
          {{ btn.name }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentTime = ref('')
const activeIndex = ref(0)

const navButtons = [
  { name: 'Home', path: '/dashboard' },
  { name: 'Prediction / Appointment', path: '/predict' },
  { name: 'Data Table', path: '/table' }
]

// Update time
const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const handleClick = (path, index) => {
  activeIndex.value = index
  router.push(path)
}
</script>

<style scoped>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #1a3a5c 0%, #0d4a6e 50%, #1a3a5c 100%);
  border-bottom: 2px solid #00bfff;
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.3);
}

.nav-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 40px;
  z-index: 1;
}

/* Left: Title + Time */
.nav-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.title-icon {
  color: #00bfff;
  margin-right: 10px;
  font-size: 28px;
}

/* Navigation buttons */
.nav-buttons {
  display: flex;
  gap: 8px;
}

.nav-btn {
  padding: 10px 20px;
  font-size: 15px;
  color: #b8d4e8;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(0, 50, 80, 0.5);
  border: 1px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-btn:hover {
  color: #fff;
  background: rgba(0, 100, 150, 0.5);
  border-color: #00bfff;
}

.nav-btn.active {
  color: #fff;
  background: linear-gradient(180deg, #1a5a8a 0%, #0d3a5e 100%);
  border-color: #00bfff;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Time display */
.nav-time {
  font-size: 18px;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

.time-icon {
  margin-right: 8px;
  color: #00bfff;
}
</style>
