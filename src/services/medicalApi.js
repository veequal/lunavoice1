/**
 * Medical Records API service (mock) — Secure Management Of Medical Records In An AI-Enhanced System
 *
 * TODO: Replace mock implementation with real backend API integration once credentials/access are available.
 */

import { mockDelay, mockSuccess } from './apiClient.js'
import { mockPatients } from '../mock/patients.js'
import { mockAppointments } from '../mock/appointments.js'
import {
  parentCalendarAnchor,
  parentChildProfile,
  parentMessages,
  parentMinutesSeries,
  parentNotifications,
  parentPronunciationSeries,
  parentSessionHistory,
  parentWeekStrip,
  parentWeeklySummary,
} from '../data/mockParentData.js'
import { achievements as parentRewards } from '../data/mockAchievements.js'
import {
  mockAccuracyTrendSeries,
  mockDoctorKpis,
  mockDoctorNotifications,
  mockMedicalSummaries,
  mockSecureDocuments,
  mockTherapistRecommendations,
  mockTherapySessions,
  mockWeeklyImprovementSeries,
} from '../mock/records.js'

export async function getPatients() {
  return mockSuccess([...mockPatients])
}

export async function getPatientById(patientId) {
  const patient = mockPatients.find((p) => p.id === patientId) ?? null
  return mockSuccess(patient)
}

export async function getAppointments({ portal = 'doctor' } = {}) {
  const list = mockAppointments.filter((a) => a.portalVisibility.includes(portal))
  return mockSuccess(list)
}

export async function getMedicalSummaries() {
  return mockSuccess([...mockMedicalSummaries])
}

export async function getNotifications() {
  return mockSuccess([...mockDoctorNotifications])
}

/**
 * Simulates multipart upload + OCR enqueue (no real network I/O).
 * @param {{ fileName: string, kind?: string, patientId?: string }} meta
 */
export async function uploadRecord(meta) {
  const now = new Date().toISOString()
  const record = {
    id: `up_${Math.random().toString(36).slice(2, 10)}`,
    ...meta,
    ocrStatus: 'queued',
    receivedAt: now,
    message: 'Document received — OCR pipeline scheduled (mock).',
  }
  return mockSuccess(record, { delayMs: 900 })
}

export async function getTherapySessions() {
  return mockSuccess([...mockTherapySessions])
}

export async function getSecureDocuments() {
  return mockSuccess([...mockSecureDocuments])
}

export async function getDoctorAnalytics() {
  return mockSuccess({
    kpis: [...mockDoctorKpis],
    weeklyImprovementSeries: [...mockWeeklyImprovementSeries],
    accuracyTrendSeries: [...mockAccuracyTrendSeries],
  })
}

/** Single round-trip style payload for the clinician overview tab (one simulated latency). */
export async function getClinicianWorkspaceSnapshot() {
  await mockDelay()
  return {
    ok: true,
    data: {
      analytics: {
        kpis: [...mockDoctorKpis],
        weeklyImprovementSeries: [...mockWeeklyImprovementSeries],
        accuracyTrendSeries: [...mockAccuracyTrendSeries],
      },
      summaries: [...mockMedicalSummaries],
      notifications: [...mockDoctorNotifications],
      therapySessions: [...mockTherapySessions],
    },
  }
}

/** Parent portal: child progress mirrors linked EMR + ASR aggregates (mock join). */
export async function getParentLinkedProgress(patientId = 'p1') {
  const patient = mockPatients.find((p) => p.id === patientId)
  return mockSuccess({
    profile: patient
      ? {
          name: patient.name,
          age: patient.age,
          improvementPct: Math.round((patient.accuracy - 0.72) * 100),
          sparkline: [62, 64, 67, 70, 74, Math.round(patient.accuracy * 100 - 10), Math.round(patient.accuracy * 100)],
        }
      : null,
  })
}

export async function getTherapistRecommendationsForParent(patientId = 'p1') {
  const recs = mockTherapistRecommendations.filter((r) => r.patientId === patientId)
  return mockSuccess(recs)
}

/**
 * Family hub bundle — combines EMR-linked scheduling + caregiver-facing copy (still mock).
 * Static copy (messages, week strip) lives in `mockParentData` until those records migrate to EMR mocks.
 */
export async function getParentFamilyHubSnapshot(patientId = 'p1') {
  await mockDelay()
  const patient = mockPatients.find((p) => p.id === patientId)
  const appointments = mockAppointments.filter(
    (a) => a.portalVisibility.includes('parent') && a.patientId === patientId,
  )
  const therapistRecommendations = mockTherapistRecommendations.filter((r) => r.patientId === patientId)

  return {
    ok: true,
    data: {
      linkedProfile: patient
        ? {
            name: parentChildProfile.name,
            age: parentChildProfile.age,
            improvementPct: parentChildProfile.improvementPct,
            sparkline: parentChildProfile.sparkline,
            patientId: patient.id,
          }
        : null,
      appointments,
      therapistRecommendations,
      rewards: parentRewards,
      messages: parentMessages,
      weeklySummary: parentWeeklySummary,
      sessionHistory: parentSessionHistory,
      chartMinutes: parentMinutesSeries,
      chartPronunciation: parentPronunciationSeries,
      weekStrip: parentWeekStrip,
      calendarAnchor: parentCalendarAnchor,
      notifications: parentNotifications,
    },
  }
}
