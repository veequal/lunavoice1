/**
 * Secure medical records facet — chart documents, OCR pipeline, AI summaries, therapy sessions.
 * Names / MRNs align with `mockPatients` for join demos.
 */

export const mockTherapySessions = [
  {
    id: 'ts1',
    patientId: 'p2',
    patientName: 'Maya Chen',
    type: 'Telehealth',
    durationMin: 45,
    date: '2026-05-14T15:00:00Z',
    status: 'completed',
    focus: '/r/ medial — minimal pairs',
    therapist: 'Dr. Elena Ortiz',
  },
  {
    id: 'ts2',
    patientId: 'p1',
    patientName: 'Avery Patel',
    type: 'In-person',
    durationMin: 50,
    date: '2026-05-14T10:30:00Z',
    status: 'completed',
    focus: 'S-blends — multisensory cues',
    therapist: 'Dr. Elena Ortiz',
  },
  {
    id: 'ts3',
    patientId: 'p4',
    patientName: 'Jordan Ellis',
    type: 'Telehealth',
    durationMin: 40,
    date: '2026-05-13T18:15:00Z',
    status: 'note_pending',
    focus: 'Easy onsets — light contacts',
    therapist: 'Dr. Elena Ortiz',
  },
  {
    id: 'ts4',
    patientId: 'p3',
    patientName: 'Noah Williams',
    type: 'In-person',
    durationMin: 55,
    date: '2026-05-13T09:00:00Z',
    status: 'completed',
    focus: 'Social inference — story retell',
    therapist: 'Dr. James Park',
  },
  {
    id: 'ts5',
    patientId: 'p5',
    patientName: 'Riley Gomez',
    type: 'Telehealth',
    durationMin: 42,
    date: '2026-05-12T16:45:00Z',
    status: 'cancelled',
    focus: 'DTTC — blocked practice',
    therapist: 'Dr. Elena Ortiz',
  },
]

/** AI-generated clinical drafts — future: grounded on session telemetry + OCR chart extracts. */
export const mockMedicalSummaries = [
  {
    id: 's1',
    patientId: 'p2',
    name: 'Maya Chen',
    summary:
      'Consistent gains on /r/ in medial position; mild fatigue noted in evening sessions. Recommend shorter bursts with higher reinforcement density.',
    confidence: 0.89,
    updatedAt: '2026-05-14T16:20:00Z',
    tags: ['Articulation', 'Carryover'],
  },
  {
    id: 's2',
    patientId: 'p4',
    name: 'Jordan Ellis',
    summary:
      'Fluency shaping progressing; stuttering moments decreased 18% week-over-week. Parent coaching adherence strong.',
    confidence: 0.92,
    updatedAt: '2026-05-13T11:05:00Z',
    tags: ['Fluency', 'Parent-led'],
  },
  {
    id: 's3',
    patientId: 'p1',
    name: 'Avery Patel',
    summary:
      'Phonological process suppression for cluster reduction trending positive. Monitor vowel space on high front targets.',
    confidence: 0.86,
    updatedAt: '2026-05-12T09:40:00Z',
    tags: ['Phonology', 'Monitoring'],
  },
]

export const mockDoctorNotifications = [
  { id: 'n1', title: 'Care plan signed', body: 'Dr. Ortiz signed Avery Patel’s updated IEP-aligned plan.', time: '12m ago', unread: true },
  { id: 'n2', title: 'Session note overdue', body: 'Jordan Ellis — telehealth note pending co-signature.', time: '1h ago', unread: true },
  { id: 'n3', title: 'AI summary refreshed', body: '3 new summarization runs completed overnight.', time: 'Today', unread: false },
]

export const mockDoctorKpis = [
  { id: 'active', label: 'Active Patients', value: '28', delta: '+3 this week', hint: 'Pediatric caseload' },
  { id: 'accuracy', label: 'Therapy Accuracy', value: '94.2%', delta: '+1.1% vs last week', hint: 'Goal-aligned session scoring' },
  { id: 'ai', label: 'AI Confidence Score', value: '0.91', delta: 'Stable', hint: 'LunaVoice clinical summarization model' },
  { id: 'weekly', label: 'Weekly Progress', value: '+12%', delta: 'Avg. phoneme clarity', hint: 'Rolling 7-day cohort lift' },
]

export const mockWeeklyImprovementSeries = [
  { week: 'W1', score: 62, sessions: 18 },
  { week: 'W2', score: 66, sessions: 21 },
  { week: 'W3', score: 71, sessions: 19 },
  { week: 'W4', score: 74, sessions: 24 },
  { week: 'W5', score: 78, sessions: 22 },
  { week: 'W6', score: 81, sessions: 26 },
  { week: 'W7', score: 84, sessions: 25 },
]

export const mockAccuracyTrendSeries = [
  { day: 'Mon', accuracy: 91 },
  { day: 'Tue', accuracy: 93 },
  { day: 'Wed', accuracy: 92 },
  { day: 'Thu', accuracy: 95 },
  { day: 'Fri', accuracy: 94 },
  { day: 'Sat', accuracy: 96 },
  { day: 'Sun', accuracy: 94 },
]

/** Simulated chart uploads / OCR queue */
export const mockSecureDocuments = [
  {
    id: 'd1',
    patientId: 'p1',
    label: 'Outside audiology report (PDF)',
    uploadedAt: '2026-05-10T14:22:00Z',
    ocrStatus: 'complete',
    aiExtractConfidence: 0.94,
    storageTier: 'HIPAA-ready vault (mock)',
  },
  {
    id: 'd2',
    patientId: 'p2',
    label: 'School IEP addendum — signed',
    uploadedAt: '2026-05-12T19:05:00Z',
    ocrStatus: 'processing',
    aiExtractConfidence: null,
    storageTier: 'HIPAA-ready vault (mock)',
  },
  {
    id: 'd3',
    patientId: 'p4',
    label: 'Fluency baseline worksheet (scan)',
    uploadedAt: '2026-05-08T11:40:00Z',
    ocrStatus: 'needs_review',
    aiExtractConfidence: 0.81,
    storageTier: 'HIPAA-ready vault (mock)',
  },
]

/** Parent-facing therapist recommendations (derived charting — mock). */
export const mockTherapistRecommendations = [
  {
    id: 'r1',
    patientId: 'p1',
    author: 'Dr. Elena Ortiz',
    role: 'SLP',
    priority: 'high',
    headline: 'Nightly micro-practice: S-blends',
    detail: 'Keep bursts to 5 minutes; model a slow “snake sound” before words like “spoon” and “star”. Celebrate self-corrections.',
    updatedAt: '2026-05-14T17:02:00Z',
  },
  {
    id: 'r2',
    patientId: 'p1',
    author: 'Care Team',
    role: 'Coordinator',
    priority: 'normal',
    headline: 'Prep for telehealth',
    detail: 'Use wired headphones if available; test microphone 10 minutes before the session link opens.',
    updatedAt: '2026-05-13T09:15:00Z',
  },
]
