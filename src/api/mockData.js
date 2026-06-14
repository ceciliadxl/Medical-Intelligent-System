// Mock data - Replace with real API calls in production
export const mockCasesData = [
  { id: 1, type: 'Hypertension', gender: 'Female', age: '35', time: '01.09', content: '35-year-old female, discovered hypertension in May...', docName: 'Li Mingzhou', docHospital: 'Beijing Hospital', department: 'Cardiology', height: '163', weight: '63', illDuration: 'None', allergy: 'None' },
  { id: 2, type: 'Hypertension', gender: 'Male', age: '68', time: '01.09', content: 'Taking hypertension medication for 7-8 years...', docName: 'Guan Huiyong', docHospital: 'Yangdong District People\'s Hospital', department: 'General Internal Medicine', height: '163', weight: '79', illDuration: 'Within 1 month', allergy: 'None' },
  { id: 3, type: 'Hypertension', gender: 'Male', age: '58', time: '01.09', content: 'Unstable blood pressure...', docName: 'Zhang Chen', docHospital: 'Lu\'an Traditional Chinese Medicine Hospital', department: 'General Internal Medicine', height: '168', weight: '69', illDuration: 'Over 6 months', allergy: 'None' },
  { id: 4, type: 'Hypertension', gender: 'Female', age: '34', time: '01.09', content: 'Slightly elevated blood pressure during lactation...', docName: 'Li Quanyi', docHospital: 'Nanjing Brain Hospital', department: 'Cardiology', height: '174', weight: '77', illDuration: 'Within 1 month', allergy: 'None' },
  { id: 5, type: 'Hypertension', gender: 'Female', age: '61', time: '01.09', content: 'Hypertension, blood pressure between 150-190...', docName: 'Wei Yongjian', docHospital: 'Jiamusi Central Hospital', department: 'General Internal Medicine', height: '166', weight: '55', illDuration: 'Within 1 month', allergy: 'None' },
  { id: 46, type: 'Cold', gender: 'Female', age: '32', time: '01.09', content: 'Cold for nearly 10 days, nasal congestion and runny nose...', docName: 'Liu Weinan', docHospital: 'Lu\'an Traditional Chinese Medicine Hospital', department: 'Respiratory', height: '163', weight: '55', illDuration: 'Within 1 month', allergy: 'None' },
  { id: 91, type: 'Fracture', gender: 'Male', age: '34', time: '01.09', content: 'Fell on 12.30, right elbow olecranon fracture...', docName: 'Lv Xiaohua', docHospital: 'Xishuangbanna People\'s Hospital', department: 'Orthopedics', height: '187', weight: '88', illDuration: 'Within 1 week', allergy: 'None' },
  { id: 136, type: 'Cervical Spondylosis', gender: 'Male', age: '18', time: '01.09', content: 'Cervical spondylosis, neck pain and soreness...', docName: 'Huang Xiaodong', docHospital: 'First Affiliated Hospital of Guangzhou Medical University', department: 'Spine Surgery', height: '175', weight: '87', illDuration: 'Over 6 months', allergy: 'None' },
  { id: 181, type: 'Lumbar Disc Herniation', gender: 'Male', age: '59', time: '01.09', content: 'Lumbar disc herniation, could not get up Monday morning due to pain...', docName: 'Lv Xiaohua', docHospital: 'Xishuangbanna People\'s Hospital', department: 'Orthopedics', height: '165', weight: '60', illDuration: 'Within 1 month', allergy: 'None' },
  { id: 226, type: 'Gastritis', gender: 'Female', age: '65', time: '01.09', content: 'Stomach discomfort for nearly half a month, loose stools...', docName: 'Liu Xishuang', docHospital: 'Affiliated Hospital of Qingdao University', department: 'Gastroenterology', height: '167', weight: '53', illDuration: 'None', allergy: 'None' },
  { id: 271, type: 'Depression', gender: 'Female', age: '55', time: '01.09', content: 'Constantly dreaming after taking depression medication...', docName: 'Lv Qinyu', docHospital: 'Shanghai Mental Health Center', department: 'Psychiatry', height: '160', weight: '51', illDuration: 'None', allergy: 'None' }
]

// Disease type distribution data
export const diseaseDistribution = [
  { name: 'Lumbar Disc Herniation', value: 50 },
  { name: 'Gastritis', value: 42 },
  { name: 'Cold', value: 45 },
  { name: 'Fracture', value: 40 },
  { name: 'Hypertension', value: 45 },
  { name: 'Cervical Spondylosis', value: 45 },
  { name: 'Depression', value: 45 }
]

// Age group distribution data
export const ageDistribution = [
  { name: '0-18 y/o', value: 5 },
  { name: '19-30 y/o', value: 35 },
  { name: '31-45 y/o', value: 85 },
  { name: '46-60 y/o', value: 120 },
  { name: '60+ y/o', value: 55 }
]

// Gender distribution data
export const genderDistribution = [
  { name: 'Male', value: 165 },
  { name: 'Female', value: 135 }
]

// Department distribution data
export const departmentDistribution = [
  { name: 'Orthopedics', value: 90 },
  { name: 'Gastroenterology', value: 42 },
  { name: 'Respiratory', value: 45 },
  { name: 'Cardiology', value: 45 },
  { name: 'Neurology', value: 25 },
  { name: 'Psychiatry', value: 45 },
  { name: 'General Internal Medicine', value: 35 }
]

// Stats cards data
export const statsCards = [
  { label: 'Total Records', value: 345, icon: 'DataAnalysis' },
  { label: 'Top Disease', value: 'Lumbar Disc Herniation', icon: 'Document' },
  { label: 'Top Department', value: 'Orthopedics', icon: 'OfficeBuilding' },
  { label: 'Max Patient Age', value: '92 y/o', icon: 'User' },
  { label: 'Min Patient Age', value: '9 y/o', icon: 'UserFilled' },
  { label: 'Popular Hospital', value: 'Lu\'an TCM Hospital', icon: 'Hospital' }
]

// Keywords data
export const keywords = [
  { name: 'Lumbar Disc Herniation', value: 100 },
  { name: 'Hypertension', value: 85 },
  { name: 'Gastritis', value: 70 },
  { name: 'Cold', value: 65 },
  { name: 'Fracture', value: 60 },
  { name: 'Cervical Spondylosis', value: 55 },
  { name: 'Depression', value: 50 }
]

// Height & weight average data
export const heightWeightData = {
  categories: ['Hypertension', 'Cold', 'Fracture', 'Cervical Spondylosis', 'Lumbar Disc Herniation', 'Gastritis', 'Depression'],
  heights: [167, 168, 173, 170, 172, 165, 163],
  weights: [68, 62, 70, 72, 70, 58, 60]
}
