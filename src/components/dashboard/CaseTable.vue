<template>
  <CardContainer title="Case List">
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="(col, cIndex) in columns" :key="cIndex">
              {{ row[cIndex] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardContainer>
</template>

<script setup>
import { ref } from 'vue'
import CardContainer from './CardContainer.vue'

const columns = ['ID', 'Type', 'Gender', 'Age', 'Height', 'Weight', 'Duration']

const tableData = ref([
  ['--', '--', '--', '--', '--', '--', '--'],
  ['--', '--', '--', '--', '--', '--', '--'],
  ['--', '--', '--', '--', '--', '--', '--'],
  ['--', '--', '--', '--', '--', '--', '--']
])

// Expose update data method
const updateData = (data) => {
  if (data && Array.isArray(data)) {
    tableData.value = data.slice(0, 4).map(item => [
      item.id || '--',
      item.diseaseType || '--',
      item.gender || '--',
      item.age || '--',
      item.height || '--',
      item.weight || '--',
      item.duration || '--'
    ])
  }
}

defineExpose({ updateData })
</script>

<style scoped>
.table-wrapper {
  min-height: 280px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.data-table thead {
  background: rgba(0, 60, 100, 0.5);
}

.data-table th {
  padding: 8px 6px;
  color: #00d4ff;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgba(0, 191, 255, 0.3);
  white-space: nowrap;
}

.data-table td {
  padding: 8px 6px;
  color: #e0e0e0;
  text-align: center;
  border-bottom: 1px solid rgba(0, 191, 255, 0.1);
  white-space: nowrap;
}

.data-table tbody tr:hover {
  background: rgba(0, 100, 150, 0.2);
}

.data-table tbody tr:nth-child(even) {
  background: rgba(0, 40, 70, 0.3);
}
</style>
