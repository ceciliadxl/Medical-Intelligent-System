<template>
  <div class="card-container" :style="{ height: height }">
    <div class="card-header">
      <span class="header-line"></span>
      <span class="header-title">{{ title }}</span>
      <span class="header-line"></span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '100%'
  }
})
</script>

<style scoped>
.card-container {
  background: linear-gradient(135deg, rgba(13, 47, 80, 0.8) 0%, rgba(10, 25, 47, 0.9) 100%);
  border: 1px solid rgba(0, 191, 255, 0.4);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 
    0 0 20px rgba(0, 191, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00bfff, transparent);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  padding: 0 16px;
  white-space: nowrap;
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.5), transparent);
}

.card-content {
  flex: 1;
  position: relative;
  overflow-y: auto;
}

/* Scrollbar styles */
.card-content::-webkit-scrollbar {
  width: 4px;
}

.card-content::-webkit-scrollbar-track {
  background: rgba(0, 30, 60, 0.3);
  border-radius: 2px;
}

.card-content::-webkit-scrollbar-thumb {
  background: rgba(0, 191, 255, 0.4);
  border-radius: 2px;
}

.card-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 191, 255, 0.6);
}
</style>
