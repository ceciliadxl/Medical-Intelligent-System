/**
 * Medical AI Data Analysis & Visualization System - API Service
 * Provides unified data interface for easy backend database integration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Get dashboard homepage data
 * @returns {Promise<Object>} Returns all chart data
 */
export const getDashboardData = async () => {
  try {
    // Mock data - Replace with real API call in production
    // const response = await fetch(`${API_BASE_URL}/api/dashboard`)
    // return await response.json()
    
    return getMockData()
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    throw error
  }
}

/**
 * Get age distribution data
 * @returns {Promise<Array>}
 */
export const getAgeDistribution = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/age-distribution`)
    // return await response.json()
    return getMockData().ageDistribution
  } catch (error) {
    console.error('Failed to fetch age distribution:', error)
    throw error
  }
}

/**
 * Get disease type distribution data
 * @returns {Promise<Array>}
 */
export const getDiseaseDistribution = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/disease-distribution`)
    // return await response.json()
    return getMockData().diseaseDistribution
  } catch (error) {
    console.error('Failed to fetch disease distribution:', error)
    throw error
  }
}

/**
 * Get case list data
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>}
 */
export const getCaseList = async (params = {}) => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/case-list?${new URLSearchParams(params)}`)
    // return await response.json()
    return { list: getMockData().caseList, total: 100 }
  } catch (error) {
    console.error('Failed to fetch case list:', error)
    throw error
  }
}

/**
 * Get summary statistics
 * @returns {Promise<Object>}
 */
export const getSummary = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/summary`)
    // return await response.json()
    return getMockData().summary
  } catch (error) {
    console.error('Failed to fetch summary:', error)
    throw error
  }
}

/**
 * Get gender comparison data
 * @returns {Promise<Object>}
 */
export const getGenderCompare = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/gender-compare`)
    // return await response.json()
    return getMockData().genderCompare
  } catch (error) {
    console.error('Failed to fetch gender comparison:', error)
    throw error
  }
}

/**
 * Get height & weight statistics
 * @returns {Promise<Object>}
 */
export const getHeightWeight = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/height-weight`)
    // return await response.json()
    return getMockData().heightWeight
  } catch (error) {
    console.error('Failed to fetch height & weight data:', error)
    throw error
  }
}

/**
 * Get department distribution data
 * @returns {Promise<Array>}
 */
export const getDepartmentDistribution = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/department-distribution`)
    // return await response.json()
    return getMockData().departmentDistribution
  } catch (error) {
    console.error('Failed to fetch department distribution:', error)
    throw error
  }
}

/**
 * Get keyword cloud data
 * @returns {Promise<Object>}
 */
export const getKeywords = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/keywords`)
    // return await response.json()
    return getMockData().keywords
  } catch (error) {
    console.error('Failed to fetch keywords:', error)
    throw error
  }
}

/**
 * Mock data - Remove this function in production
 */
const getMockData = () => {
  return {
    // Age group distribution
    ageDistribution: [
      { name: '0-10 y/o', value: 8 },
      { name: '10-20 y/o', value: 12 },
      { name: '20-30 y/o', value: 18 },
      { name: '30-40 y/o', value: 25 },
      { name: '40-50 y/o', value: 20 },
      { name: '50-60 y/o', value: 12 },
      { name: '60+ y/o', value: 15 }
    ],
    
    // Disease type distribution
    diseaseDistribution: [
      { name: 'Cervical Spondylosis', value: 45 },
      { name: 'Hypertension', value: 42 },
      { name: 'Depression', value: 38 },
      { name: 'Fracture', value: 35 },
      { name: 'Lumbar Disc Herniation', value: 60 },
      { name: 'Gastritis', value: 40 }
    ],
    
    // Case list
    caseList: [
      { id: 1, diseaseType: 'Hypertension', gender: 'Female', age: 35, height: 163, weight: 63, duration: 'None' },
      { id: 2, diseaseType: 'Hypertension', gender: 'Male', age: 68, height: 163, weight: 79, duration: 'Within 1 month' },
      { id: 3, diseaseType: 'Hypertension', gender: 'Male', age: 58, height: 168, weight: 69, duration: 'Over 6 months' },
      { id: 4, diseaseType: 'Hypertension', gender: 'Female', age: 34, height: 174, weight: 77, duration: 'Within 1 month' }
    ],
    
    // Summary info
    summary: {
      totalCount: 345,
      topDisease: 'Lumbar Disc Herniation',
      topDept: 'Orthopedics',
      maxAge: 92,
      minAge: 9,
      topHospital: 'Lu\'an TCM Hospital'
    },
    
    // Gender comparison
    genderCompare: {
      male: [
        { name: 'Depression', value: 17 },
        { name: 'Other', value: 83 }
      ],
      female: [
        { name: 'Depression', value: 17 },
        { name: 'Other', value: 83 }
      ],
      percent: 53
    },
    
    // Height & weight data
    heightWeight: {
      diseases: ['Fracture', 'Depression', 'Hypertension', 'Cervical Spondylosis', 'Gastritis', 'Lumbar Disc Herniation'],
      heights: [165, 168, 170, 172, 169, 171],
      weights: [62, 65, 70, 68, 63, 67]
    },
    
    // Department distribution
    departmentDistribution: [
      { name: 'Psychiatry', value: 20 },
      { name: 'Cardiology', value: 25 },
      { name: 'General Internal Medicine', value: 30 },
      { name: 'Spine Surgery', value: 15 },
      { name: 'Emergency', value: 10 }
    ],
    
    // Keyword cloud
    keywords: {
      main: 'Lumbar Disc Herniation',
      sub: [
        { name: 'Hypertension', size: 16, color: '#4fc3f7' },
        { name: 'Cervical Spondylosis', size: 14, color: '#81c784' },
        { name: 'Gastritis', size: 15, color: '#fff176' },
        { name: 'Depression', size: 13, color: '#e57373' },
        { name: 'Fracture', size: 14, color: '#ba68c8' },
        { name: 'Diabetes', size: 16, color: '#64b5f6' },
        { name: 'Coronary Heart Disease', size: 13, color: '#ffb74d' }
      ]
    }
  }
}
