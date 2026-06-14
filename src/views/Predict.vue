<template>
  <div class="predict-page">
    <!-- Background decoration -->
    <div class="bg-decoration">
      <div class="grid-overlay"></div>
    </div>

    <!-- Top navigation -->
    <HeaderNav />

    <!-- Main content -->
    <main class="main-content">
      <!-- Step indicator -->
      <div class="steps-bar" v-if="currentStep !== 'result'">
        <div class="step-item" :class="{ active: currentStep === 'form', done: currentStep === 'confirm' }">
          <div class="step-num">1</div>
          <span class="step-label">Fill Appointment Info</span>
        </div>
        <div class="step-line" :class="{ active: currentStep === 'confirm' }"></div>
        <div class="step-item" :class="{ active: currentStep === 'confirm' }">
          <div class="step-num">2</div>
          <span class="step-label">Confirm Details</span>
        </div>
        <div class="step-line"></div>
        <div class="step-item">
          <div class="step-num">3</div>
          <span class="step-label">Success & Prediction</span>
        </div>
      </div>

      <div class="predict-container">

        <!-- ========== Step 1: Fill appointment form ========== -->
        <section class="panel full" v-if="currentStep === 'form'">
          <div class="panel-header">
            <span class="header-icon">📅</span>
            <span class="header-title">Online Appointment</span>
            <span class="header-line"></span>
          </div>
          <div class="panel-body">
            <el-form ref="appointFormRef" :model="appointData" :rules="appointRules" label-position="top" size="default">
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="Patient Name" prop="patientName">
                    <el-input v-model="appointData.patientName" placeholder="Enter patient name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Phone Number" prop="phone">
                    <el-input v-model="appointData.phone" placeholder="Enter phone number" maxlength="11" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Gender" prop="gender">
                    <el-select v-model="appointData.gender" placeholder="Select gender" style="width: 100%">
                      <el-option label="Male" value="Male" />
                      <el-option label="Female" value="Female" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="Age" prop="age">
                    <el-input-number v-model="appointData.age" :min="0" :max="120" placeholder="Enter age" controls-position="right" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Height (cm)" prop="height">
                    <el-input-number v-model="appointData.height" :min="50" :max="250" placeholder="Enter height" controls-position="right" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Weight (kg)" prop="weight">
                    <el-input-number v-model="appointData.weight" :min="20" :max="300" placeholder="Enter weight" controls-position="right" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="Hospital" prop="hospital">
                    <el-select v-model="appointData.hospital" placeholder="Select hospital" style="width: 100%" filterable>
                      <el-option label="Peking Union Medical College Hospital" value="Peking Union Medical College Hospital" />
                      <el-option label="Peking University First Hospital" value="Peking University First Hospital" />
                      <el-option label="Chinese PLA General Hospital" value="Chinese PLA General Hospital" />
                      <el-option label="Ruijin Hospital (Shanghai)" value="Ruijin Hospital (Shanghai)" />
                      <el-option label="Zhongshan Hospital (Fudan)" value="Zhongshan Hospital (Fudan)" />
                      <el-option label="First Affiliated Hospital (Zhejiang)" value="First Affiliated Hospital (Zhejiang)" />
                      <el-option label="Lu'an Traditional Chinese Medicine Hospital" value="Lu'an Traditional Chinese Medicine Hospital" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Department" prop="department">
                    <el-select v-model="appointData.department" placeholder="Select department" style="width: 100%">
                      <el-option label="Orthopedics" value="Orthopedics" />
                      <el-option label="Cardiology" value="Cardiology" />
                      <el-option label="Neurology" value="Neurology" />
                      <el-option label="Gastroenterology" value="Gastroenterology" />
                      <el-option label="Respiratory" value="Respiratory" />
                      <el-option label="Psychiatry" value="Psychiatry" />
                      <el-option label="Spine Surgery" value="Spine Surgery" />
                      <el-option label="General Internal Medicine" value="General Internal Medicine" />
                      <el-option label="Emergency" value="Emergency" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="Appointment Date" prop="date">
                    <el-date-picker v-model="appointData.date" type="date" placeholder="Select date" style="width: 100%"
                      :disabled-date="disabledDate" value-format="YYYY-MM-DD" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Time Slot" prop="timeSlot">
                    <el-select v-model="appointData.timeSlot" placeholder="Select time slot" style="width: 100%">
                      <el-option label="AM 08:00-09:00" value="08:00-09:00" />
                      <el-option label="AM 09:00-10:00" value="09:00-10:00" />
                      <el-option label="AM 10:00-11:00" value="10:00-11:00" />
                      <el-option label="PM 14:00-15:00" value="14:00-15:00" />
                      <el-option label="PM 15:00-16:00" value="15:00-16:00" />
                      <el-option label="PM 16:00-17:00" value="16:00-17:00" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Main Symptom" prop="symptom">
                    <el-select v-model="appointData.symptom" placeholder="Select main symptom" style="width: 100%" filterable>
                      <el-option label="Headache / Dizziness" value="Headache / Dizziness" />
                      <el-option label="Chest Tightness / Palpitation" value="Chest Tightness / Palpitation" />
                      <el-option label="Back / Leg Pain" value="Back / Leg Pain" />
                      <el-option label="Joint Pain" value="Joint Pain" />
                      <el-option label="Stomach Pain / Bloating" value="Stomach Pain / Bloating" />
                      <el-option label="Cough / Fever" value="Cough / Fever" />
                      <el-option label="Insomnia / Anxiety" value="Insomnia / Anxiety" />
                      <el-option label="Rash / Allergy" value="Rash / Allergy" />
                      <el-option label="Blurred Vision" value="Blurred Vision" />
                      <el-option label="Other Discomfort" value="Other Discomfort" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="Symptom Duration" prop="duration">
                    <el-select v-model="appointData.duration" placeholder="Select duration" style="width: 100%">
                      <el-option label="Within 1 week" value="Within 1 week" />
                      <el-option label="Within 1 month" value="Within 1 month" />
                      <el-option label="1-6 months" value="1-6 months" />
                      <el-option label="Over 6 months" value="Over 6 months" />
                      <el-option label="Over 1 year" value="Over 1 year" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Medical History" prop="history">
                    <el-select v-model="appointData.history" placeholder="Select medical history (multi-select)" style="width: 100%" multiple filterable>
                      <el-option label="Hypertension" value="Hypertension" />
                      <el-option label="Diabetes" value="Diabetes" />
                      <el-option label="Heart Disease" value="Heart Disease" />
                      <el-option label="Hepatitis" value="Hepatitis" />
                      <el-option label="Stomach Disease" value="Stomach Disease" />
                      <el-option label="Allergy History" value="Allergy History" />
                      <el-option label="Surgery History" value="Surgery History" />
                      <el-option label="Fracture History" value="Fracture History" />
                      <el-option label="None" value="None" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="Condition Description" prop="description">
                <el-input v-model="appointData.description" type="textarea" :rows="3" placeholder="Briefly describe your condition..." maxlength="300" show-word-limit />
              </el-form-item>

              <el-form-item style="text-align: center; padding-top: 10px;">
                <el-button type="primary" size="large" class="action-btn next-btn" @click="handleNextStep">
                  Next: Confirm Details <el-icon style="margin-left: 4px;"><ArrowRight /></el-icon>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>

        <!-- ========== Step 2: Confirm appointment info ========== -->
        <section class="panel full" v-if="currentStep === 'confirm'">
          <div class="panel-header">
            <span class="header-icon">📋</span>
            <span class="header-title">Confirm Appointment</span>
            <span class="header-line"></span>
          </div>
          <div class="panel-body confirm-body">
            <div class="confirm-card">
              <div class="confirm-section">
                <h4 class="section-title">Basic Info</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Patient Name</span>
                    <span class="info-value">{{ appointData.patientName }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phone</span>
                    <span class="info-value">{{ appointData.phone }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Gender</span>
                    <span class="info-value">{{ appointData.gender }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Age</span>
                    <span class="info-value">{{ appointData.age }} y/o</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Height</span>
                    <span class="info-value">{{ appointData.height }} cm</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Weight</span>
                    <span class="info-value">{{ appointData.weight }} kg</span>
                  </div>
                </div>
              </div>

              <div class="confirm-section">
                <h4 class="section-title">Appointment Info</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Hospital</span>
                    <span class="info-value highlight">{{ appointData.hospital }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Department</span>
                    <span class="info-value highlight">{{ appointData.department }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Date</span>
                    <span class="info-value">{{ appointData.date }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Time Slot</span>
                    <span class="info-value">{{ appointData.timeSlot }}</span>
                  </div>
                </div>
              </div>

              <div class="confirm-section">
                <h4 class="section-title">Health Info</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Main Symptom</span>
                    <span class="info-value">{{ appointData.symptom }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Duration</span>
                    <span class="info-value">{{ appointData.duration }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">Medical History</span>
                    <span class="info-value">{{ appointData.history.join(', ') || 'None' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">Description</span>
                    <span class="info-value">{{ appointData.description || 'None' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="confirm-actions">
              <el-button size="large" class="action-btn back-btn" @click="currentStep = 'form'">
                <el-icon><ArrowLeft /></el-icon> Back to Edit
              </el-button>
              <el-button type="success" size="large" class="action-btn submit-btn" :loading="submitLoading" @click="handleSubmit">
                <el-icon v-if="!submitLoading"><Check /></el-icon>
                {{ submitLoading ? 'Submitting...' : 'Confirm Appointment' }}
              </el-button>
            </div>
          </div>
        </section>

        <!-- ========== Step 3: Success + AI prediction result ========== -->
        <section class="result-page" v-if="currentStep === 'result'">
          <!-- Success card -->
          <div class="result-card success-card">
            <div class="success-badge">
              <span class="badge-icon">✅</span>
              <span class="badge-text">Appointment Successful</span>
            </div>
            <div class="appoint-detail">
              <div class="detail-row">
                <span class="detail-label">Appointment ID</span>
                <span class="detail-value code">{{ appointId }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Patient Name</span>
                <span class="detail-value">{{ appointData.patientName }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Hospital</span>
                <span class="detail-value">{{ appointData.hospital }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Department</span>
                <span class="detail-value">{{ appointData.department }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Visit Time</span>
                <span class="detail-value">{{ appointData.date }} {{ appointData.timeSlot }}</span>
              </div>
            </div>
            <div class="success-tip">
              <span>💡 Please arrive on time with your ID and insurance card</span>
            </div>
          </div>

          <!-- AI prediction result card -->
          <div class="result-card predict-card" v-if="predictResult">
            <div class="predict-header">
              <span class="header-icon">🔬</span>
              <span class="header-title">AI Disease Risk Prediction Report</span>
              <span class="header-badge">Based on {{ dbMatchCount }} similar cases</span>
            </div>

            <div class="predict-body">
              <!-- Risk level -->
              <div class="risk-banner" :class="'risk-' + predictResult.riskLevel">
                <div class="risk-icon">
                  {{ predictResult.riskLevel === 3 ? '⚠️' : predictResult.riskLevel === 2 ? '⚡' : '✅' }}
                </div>
                <div class="risk-info">
                  <div class="risk-title">Risk Level: {{ predictResult.riskText }}</div>
                  <div class="risk-sub">AI Confidence: {{ predictResult.confidence }}%</div>
                </div>
                <el-progress type="circle" :percentage="predictResult.confidence" :width="70"
                  :color="confidenceColor" :stroke-width="6" />
              </div>

              <!-- Prediction details -->
              <div class="predict-details">
                <div class="pd-item">
                  <span class="pd-label">Possible Disease</span>
                  <span class="pd-value disease">{{ predictResult.disease }}</span>
                </div>
                <div class="pd-item">
                  <span class="pd-label">Recommended Dept</span>
                  <span class="pd-value">{{ predictResult.department }}</span>
                </div>
                <div class="pd-item">
                  <span class="pd-label">Similar Cases in DB</span>
                  <span class="pd-value count">{{ dbMatchCount }} records</span>
                </div>
                <div class="pd-item">
                  <span class="pd-label">Disease Proportion</span>
                  <span class="pd-value">{{ predictResult.diseaseRatio }}%</span>
                </div>
              </div>

              <!-- Similar cases table -->
              <div class="similar-cases" v-if="similarCases.length > 0">
                <h4 class="section-subtitle">Similar Cases from Database</h4>
                <div class="cases-table-wrap">
                  <table class="cases-table">
                    <thead>
                      <tr>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Height(cm)</th>
                        <th>Weight(kg)</th>
                        <th>Disease</th>
                        <th>Department</th>
                        <th>Hospital</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="c in similarCases" :key="c.id">
                        <td>{{ c.age }} y/o</td>
                        <td>{{ c.gender }}</td>
                        <td>{{ c.height }}</td>
                        <td>{{ c.weight }}</td>
                        <td class="disease-cell">{{ c.type }}</td>
                        <td>{{ c.department }}</td>
                        <td>{{ c.docHospital }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Analysis description -->
              <div class="predict-desc">
                <p>{{ predictResult.description }}</p>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="result-actions">
            <el-button size="large" class="action-btn home-btn" @click="goHome">
              <el-icon><HomeFilled /></el-icon> Back to Home
            </el-button>
            <el-button size="large" class="action-btn redo-btn" @click="resetAll">
              Make Another Appointment
            </el-button>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowRight, ArrowLeft, Check, HomeFilled } from '@element-plus/icons-vue'
import HeaderNav from '@/components/dashboard/HeaderNav.vue'
import { mockCasesData } from '@/api/mockData.js'

const router = useRouter()

// ===== Step management =====
const currentStep = ref('form') // form | confirm | result
const submitLoading = ref(false)

// ===== Appointment data =====
const appointFormRef = ref(null)
const appointId = ref('')

const appointData = reactive({
  patientName: '',
  phone: '',
  gender: '',
  age: null,
  height: null,
  weight: null,
  hospital: '',
  department: '',
  date: '',
  timeSlot: '',
  symptom: '',
  duration: '',
  history: [],
  description: ''
})

const appointRules = {
  patientName: [{ required: true, message: 'Please enter patient name', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Please enter phone number', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: 'Please enter a valid phone number', trigger: 'blur' }
  ],
  gender: [{ required: true, message: 'Please select gender', trigger: 'change' }],
  age: [{ required: true, message: 'Please enter age', trigger: 'blur' }],
  height: [{ required: true, message: 'Please enter height', trigger: 'blur' }],
  weight: [{ required: true, message: 'Please enter weight', trigger: 'blur' }],
  hospital: [{ required: true, message: 'Please select hospital', trigger: 'change' }],
  department: [{ required: true, message: 'Please select department', trigger: 'change' }],
  date: [{ required: true, message: 'Please select appointment date', trigger: 'change' }],
  timeSlot: [{ required: true, message: 'Please select time slot', trigger: 'change' }],
  symptom: [{ required: true, message: 'Please select main symptom', trigger: 'change' }],
  duration: [{ required: true, message: 'Please select symptom duration', trigger: 'change' }]
}

const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}

// ===== Step navigation =====
const handleNextStep = async () => {
  if (!appointFormRef.value) return
  try {
    await appointFormRef.value.validate()
  } catch {
    ElMessage.warning('Please fill in all required fields')
    return
  }
  currentStep.value = 'confirm'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ===== Disease mapping (symptom -> disease) =====
const diseaseMap = {
  'Headache / Dizziness': { disease: 'Hypertension', department: 'Cardiology', risk: 2 },
  'Chest Tightness / Palpitation': { disease: 'Coronary Heart Disease', department: 'Cardiology', risk: 3 },
  'Back / Leg Pain': { disease: 'Lumbar Disc Herniation', department: 'Orthopedics', risk: 2 },
  'Joint Pain': { disease: 'Arthritis', department: 'Orthopedics', risk: 1 },
  'Stomach Pain / Bloating': { disease: 'Chronic Gastritis', department: 'Gastroenterology', risk: 2 },
  'Cough / Fever': { disease: 'Upper Respiratory Infection', department: 'Respiratory', risk: 1 },
  'Insomnia / Anxiety': { disease: 'Anxiety Disorder', department: 'Psychiatry', risk: 2 },
  'Rash / Allergy': { disease: 'Allergic Dermatitis', department: 'Dermatology', risk: 1 },
  'Blurred Vision': { disease: 'Refractive Error', department: 'Ophthalmology', risk: 1 },
  'Other Discomfort': { disease: 'Pending Further Examination', department: 'General Internal Medicine', risk: 1 }
}

const riskLevels = { 1: 'Low Risk', 2: 'Medium Risk', 3: 'High Risk' }

// ===== AI prediction results =====
const predictResult = ref(null)
const similarCases = ref([])
const dbMatchCount = ref(0)

const confidenceColor = computed(() => {
  const val = predictResult.value?.confidence || 0
  if (val >= 80) return '#67c23a'
  if (val >= 60) return '#e6a23c'
  return '#f56c6c'
})

// Match similar cases from database
const matchSimilarCases = (age, gender, symptom, department) => {
  const diseaseInfo = diseaseMap[symptom] || { disease: 'Pending Further Examination', department: 'General Internal Medicine' }
  const targetDisease = diseaseInfo.disease

  // Filter from mockCasesData: same department OR same disease type
  let matched = mockCasesData.filter(c => {
    const sameDept = c.department === department
    const sameType = c.type === targetDisease
    return sameDept || sameType
  })

  // Sort by age proximity
  matched.sort((a, b) => {
    return Math.abs(parseInt(a.age) - age) - Math.abs(parseInt(b.age) - age)
  })

  // Take top 5 most similar
  return matched.slice(0, 5)
}

// Calculate disease proportion from database
const calcDiseaseRatio = (diseaseName) => {
  const total = mockCasesData.length
  if (total === 0) return 0
  const count = mockCasesData.filter(c => c.type === diseaseName).length
  return Math.round((count / total) * 100)
}

// ===== Submit appointment =====
const handleSubmit = async () => {
  submitLoading.value = true

  // Simulate submission
  await new Promise(resolve => setTimeout(resolve, 1500))

  appointId.value = 'YY' + Date.now().toString().slice(-8)

  // AI prediction based on database
  const age = appointData.age || 30
  const diseaseInfo = diseaseMap[appointData.symptom] || { disease: 'Pending Further Examination', department: 'General Internal Medicine', risk: 1 }
  const historyCount = appointData.history.filter(h => h !== 'None').length
  const riskLevel = Math.min(diseaseInfo.risk + (historyCount > 2 ? 1 : 0), 3)

  // Match similar cases from database
  const cases = matchSimilarCases(age, appointData.gender, appointData.symptom, appointData.department)
  similarCases.value = cases
  dbMatchCount.value = mockCasesData.length

  // Calculate disease proportion
  const ratio = calcDiseaseRatio(diseaseInfo.disease)
  const confidence = 75 + Math.floor(Math.random() * 16) // 75-90

  predictResult.value = {
    disease: diseaseInfo.disease,
    department: diseaseInfo.department,
    riskLevel,
    riskText: riskLevels[riskLevel],
    confidence,
    diseaseRatio: ratio,
    description: generateDescription(riskLevel, diseaseInfo, ratio)
  }

  submitLoading.value = false
  currentStep.value = 'result'
  window.scrollTo({ top: 0, behavior: 'smooth' })
  ElMessage.success('Appointment successful! AI prediction report generated')
}

const generateDescription = (risk, diseaseInfo, ratio) => {
  const age = appointData.age
  const bmi = appointData.weight && appointData.height
    ? (appointData.weight / ((appointData.height / 100) ** 2)).toFixed(1)
    : '--'
  const symptom = appointData.symptom
  const duration = appointData.duration

  const base = `Based on your submitted info (Symptom: ${symptom}, Duration: ${duration}, Age: ${age}, BMI: ${bmi})`

  if (risk === 3) {
    return `${base}, the AI system assessed this as **High Risk**. This disease accounts for ~${ratio}% of cases in the database. It is strongly recommended that you visit the ${diseaseInfo.department} department as soon as possible for further examination.`
  } else if (risk === 2) {
    return `${base}, the AI system assessed this as **Medium Risk**. This disease accounts for ~${ratio}% of cases in the database. Please schedule a medical visit at your convenience and monitor symptom changes. Seek immediate care if symptoms worsen.`
  }
  return `${base}, the AI system assessed this as **Low Risk**. This disease accounts for ~${ratio}% of cases in the database. Maintain a healthy lifestyle and seek medical attention if symptoms persist or worsen.`
}

// ===== Navigation =====
const goHome = () => {
  router.push('/dashboard')
}

const resetAll = () => {
  currentStep.value = 'form'
  predictResult.value = null
  similarCases.value = []
  dbMatchCount.value = 0
  appointId.value = ''
  Object.assign(appointData, {
    patientName: '', phone: '', gender: '', age: null, height: null, weight: null,
    hospital: '', department: '', date: '', timeSlot: '',
    symptom: '', duration: '', history: [], description: ''
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.predict-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #0d2137 50%, #0a192f 100%);
  overflow-y: auto;
  overflow-x: hidden;
}

/* Background decoration */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Main content area */
.main-content {
  position: relative;
  z-index: 1;
  padding: 100px 20px 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Step indicator */
.steps-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 20px 40px;
  background: linear-gradient(135deg, rgba(13, 47, 80, 0.7) 0%, rgba(10, 25, 47, 0.8) 100%);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 8px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 30, 60, 0.8);
  border: 2px solid rgba(0, 191, 255, 0.3);
  color: #8aabbf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step-item.active .step-num {
  background: rgba(0, 191, 255, 0.2);
  border-color: #00bfff;
  color: #00d4ff;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.3);
}

.step-item.done .step-num {
  background: rgba(103, 194, 58, 0.2);
  border-color: #67c23a;
  color: #67c23a;
}

.step-label {
  font-size: 14px;
  color: #8aabbf;
  white-space: nowrap;
}

.step-item.active .step-label {
  color: #fff;
}

.step-item.done .step-label {
  color: #b8d4e8;
}

.step-line {
  width: 60px;
  height: 2px;
  background: rgba(0, 191, 255, 0.2);
  margin: 0 16px;
  transition: all 0.3s ease;
}

.step-line.active {
  background: rgba(103, 194, 58, 0.5);
}

/* Container */
.predict-container {
  width: 100%;
}

/* Panel */
.panel {
  background: linear-gradient(135deg, rgba(13, 47, 80, 0.8) 0%, rgba(10, 25, 47, 0.9) 100%);
  border: 1px solid rgba(0, 191, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00bfff, transparent);
  z-index: 1;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(0, 191, 255, 0.15);
  gap: 10px;
}

.header-icon {
  font-size: 20px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
  white-space: nowrap;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 191, 255, 0.5), transparent);
}

.panel-body {
  padding: 24px;
}

/* Element Plus dark theme overrides */
::deep(.el-form-item__label) {
  color: #b8d4e8 !important;
  font-size: 13px;
}

::deep(.el-input__wrapper) {
  background: rgba(0, 30, 60, 0.6) !important;
  border: 1px solid rgba(0, 191, 255, 0.3) !important;
  box-shadow: none !important;
  border-radius: 4px;
}
::deep(.el-input__wrapper:hover) { border-color: rgba(0, 191, 255, 0.6) !important; }
::deep(.el-input__wrapper.is-focus) {
  border-color: #00bfff !important;
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.3) !important;
}
::deep(.el-input__inner) { color: #e0e0e0 !important; }
::deep(.el-input__inner::placeholder) { color: rgba(180, 200, 220, 0.5) !important; }
::deep(.el-textarea__inner) {
  background: rgba(0, 30, 60, 0.6) !important;
  border: 1px solid rgba(0, 191, 255, 0.3) !important;
  color: #e0e0e0 !important;
}
::deep(.el-select-dropdown) {
  background: rgba(13, 47, 80, 0.95) !important;
  border: 1px solid rgba(0, 191, 255, 0.4) !important;
}
::deep(.el-select-dropdown__item) { color: #b8d4e8 !important; }
::deep(.el-select-dropdown__item.hover),
::deep(.el-select-dropdown__item:hover) { background: rgba(0, 191, 255, 0.15) !important; }
::deep(.el-select-dropdown__item.selected) { color: #00d4ff !important; }

/* Buttons */
.action-btn {
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 4px;
  padding: 12px 32px;
}

.next-btn {
  background: linear-gradient(135deg, #00bfff 0%, #0090d0 100%) !important;
  border: none !important;
  color: #fff !important;
}
.next-btn:hover { box-shadow: 0 0 20px rgba(0, 191, 255, 0.5) !important; }

.submit-btn {
  background: linear-gradient(135deg, #67c23a 0%, #529b2e 100%) !important;
  border: none !important;
}
.submit-btn:hover { box-shadow: 0 0 20px rgba(103, 194, 58, 0.5) !important; }

.back-btn {
  background: rgba(0, 191, 255, 0.15) !important;
  border: 1px solid rgba(0, 191, 255, 0.4) !important;
  color: #b8d4e8 !important;
}
.back-btn:hover { background: rgba(0, 191, 255, 0.25) !important; }

/* ===== Step 2: Confirm info ===== */
.confirm-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.confirm-section {
  padding: 20px;
  background: rgba(0, 30, 60, 0.4);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 6px;
}

.section-title {
  font-size: 15px;
  font-weight: bold;
  color: #00d4ff;
  margin: 0 0 14px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 191, 255, 0.15);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 12px;
  color: #6a8fa0;
}

.info-value {
  font-size: 14px;
  color: #d0e0f0;
  font-weight: 500;
}

.info-value.highlight {
  color: #00d4ff;
  font-weight: bold;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 191, 255, 0.15);
}

/* ===== Step 3: Result page ===== */
.result-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.result-card {
  background: linear-gradient(135deg, rgba(13, 47, 80, 0.85) 0%, rgba(10, 25, 47, 0.95) 100%);
  border: 1px solid rgba(0, 191, 255, 0.4);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
  position: relative;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00bfff, transparent);
}

/* Success card */
.success-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.badge-icon {
  font-size: 36px;
}

.badge-text {
  font-size: 22px;
  font-weight: bold;
  color: #67c23a;
  text-shadow: 0 0 10px rgba(103, 194, 58, 0.3);
}

.appoint-detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 32px;
  padding: 16px 20px;
  background: rgba(0, 20, 40, 0.5);
  border-radius: 6px;
  margin-bottom: 14px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 13px;
  color: #6a8fa0;
}

.detail-value {
  font-size: 14px;
  color: #d0e0f0;
  font-weight: 500;
}

.detail-value.code {
  color: #00d4ff;
  font-family: monospace;
  font-size: 16px;
  letter-spacing: 2px;
}

.success-tip {
  text-align: center;
  font-size: 13px;
  color: #e6a23c;
}

/* Prediction card */
.predict-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
}

.header-badge {
  margin-left: auto;
  font-size: 12px;
  color: #8aabbf;
  padding: 4px 12px;
  background: rgba(0, 191, 255, 0.1);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 12px;
}

/* Risk banner */
.risk-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.risk-banner.risk-3 {
  background: rgba(245, 108, 108, 0.12);
  border: 1px solid rgba(245, 108, 108, 0.4);
}
.risk-banner.risk-2 {
  background: rgba(230, 162, 60, 0.12);
  border: 1px solid rgba(230, 162, 60, 0.4);
}
.risk-banner.risk-1 {
  background: rgba(103, 194, 58, 0.12);
  border: 1px solid rgba(103, 194, 58, 0.4);
}

.risk-icon { font-size: 32px; }

.risk-info { flex: 1; }

.risk-title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.risk-3 .risk-title { color: #f56c6c; }
.risk-2 .risk-title { color: #e6a23c; }
.risk-1 .risk-title { color: #67c23a; }

.risk-sub {
  font-size: 13px;
  color: #8aabbf;
  margin-top: 4px;
}

/* Prediction details */
.predict-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.pd-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: rgba(0, 20, 40, 0.4);
  border-radius: 4px;
  border: 1px solid rgba(0, 191, 255, 0.15);
}

.pd-label {
  font-size: 12px;
  color: #6a8fa0;
}

.pd-value {
  font-size: 15px;
  color: #d0e0f0;
  font-weight: bold;
}

.pd-value.disease { color: #00d4ff; font-size: 16px; }
.pd-value.count { color: #ffb74d; }

/* Similar cases */
.similar-cases {
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 14px;
  font-weight: bold;
  color: #00d4ff;
  margin: 0 0 10px 0;
}

.cases-table-wrap {
  overflow-x: auto;
}

.cases-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.cases-table thead {
  background: rgba(0, 60, 100, 0.4);
}

.cases-table th {
  padding: 8px 12px;
  text-align: left;
  color: #8aabbf;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  white-space: nowrap;
}

.cases-table td {
  padding: 8px 12px;
  color: #b8d4e8;
  border-bottom: 1px solid rgba(0, 191, 255, 0.08);
}

.cases-table tbody tr:hover {
  background: rgba(0, 191, 255, 0.05);
}

.disease-cell {
  color: #ffb74d !important;
  font-weight: 500;
}

/* Analysis description */
.predict-desc {
  padding: 14px 16px;
  background: rgba(0, 20, 40, 0.5);
  border-radius: 4px;
  border-left: 3px solid rgba(0, 191, 255, 0.5);
}

.predict-desc p {
  font-size: 13px;
  color: #9ab5c9;
  line-height: 1.7;
  margin: 0;
}

/* Result actions */
.result-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 10px;
}

.home-btn {
  background: linear-gradient(135deg, #00bfff 0%, #0090d0 100%) !important;
  border: none !important;
  color: #fff !important;
}
.home-btn:hover { box-shadow: 0 0 20px rgba(0, 191, 255, 0.5) !important; }

.redo-btn {
  background: rgba(0, 191, 255, 0.15) !important;
  border: 1px solid rgba(0, 191, 255, 0.4) !important;
  color: #b8d4e8 !important;
}
.redo-btn:hover { background: rgba(0, 191, 255, 0.25) !important; }

/* Responsive */
@media (max-width: 768px) {
  .info-grid { grid-template-columns: repeat(2, 1fr); }
  .predict-details { grid-template-columns: repeat(2, 1fr); }
  .appoint-detail { grid-template-columns: 1fr; }
  .steps-bar { padding: 16px 20px; }
  .step-label { font-size: 12px; }
  .step-line { width: 30px; margin: 0 8px; }
}
</style>
