import { createRouter, createWebHistory } from 'vue-router'
import DataTable from '../views/DataTable.vue'
import DataDashboard from '../views/DataDashboard.vue'
import Predict from '../views/Predict.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'DataDashboard',
    component: DataDashboard
  },
  {
    path: '/predict',
    name: 'Predict',
    component: Predict
  },
  {
    path: '/table',
    name: 'DataTable',
    component: DataTable
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
