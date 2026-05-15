/**
 * Speech recognition & coaching API service (mock)
 *
 * AUTOMATIC SPEECH RECOGNITION SYSTEM FOR CHILDREN WITH SPEECH IMPAIRMENT
 *
 * TODO: Replace mock implementation with real backend API integration once credentials/access are available.
 */

import { mockSuccess, mockDelay } from './apiClient.js'
import {
  mockAiSpeechRecommendations,
  mockChildAchievements,
  mockEncouragementCards,
  mockPronunciationFeedback,
  mockSpeechScores,
  mockSpeechSessions,
  mockWeeklySpeechProgress,
} from '../mock/speechData.js'
import { childProgress, speechExercises } from '../data/mockChildProgress.js'

function hashToScore(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) h = (h << 5) - h + seed.charCodeAt(i)
  return 68 + (Math.abs(h) % 27)
}

/**
 * Simulates on-device capture + cloud ASR scoring (no audio leaves the browser in this demo).
 * @param {{ exerciseId: string, attempt?: number, phrase?: string }} input
 */
export async function analyzeSpeech(input) {
  const { exerciseId, attempt = 1 } = input
  const pronunciation = hashToScore(`${exerciseId}:${attempt}`)
  const clarity = Math.min(99, pronunciation + (attempt % 3) - 1)
  const confidence = Math.min(97, 72 + ((pronunciation + attempt) % 20))

  const payload = {
    requestId: `asr_${Date.now()}`,
    exerciseId,
    pronunciationScore: pronunciation,
    clarityPct: clarity,
    confidencePct: confidence,
    spectrogramReady: true,
    processingNote: 'Microphone capture simulated — enterprise ASR endpoint pending.',
  }
  return mockSuccess(payload, { delayMs: 640 })
}

export async function getSpeechScore() {
  return mockSuccess({ ...mockSpeechScores })
}

export async function getWeeklyProgress() {
  return mockSuccess([...mockWeeklySpeechProgress])
}

export async function getSpeechSessions() {
  return mockSuccess([...mockSpeechSessions])
}

export async function getAIRecommendations() {
  return mockSuccess([...mockAiSpeechRecommendations])
}

export async function getPronunciationFeedback() {
  return mockSuccess({ ...mockPronunciationFeedback })
}

export async function getChildAchievements() {
  return mockSuccess([...mockChildAchievements])
}

export async function getEncouragementForExercise(exerciseId) {
  const idx = Math.abs(hashToScore(exerciseId)) % mockEncouragementCards.length
  return mockSuccess(mockEncouragementCards[idx])
}

/** Child practice studio bundle — ASR scores + gamification + exercise deck (mock). */
export async function getChildPracticeSnapshot() {
  await mockDelay()
  return {
    ok: true,
    data: {
      scores: { ...mockSpeechScores },
      progressMeta: { ...childProgress },
      achievements: [...mockChildAchievements],
      aiRecommendations: [...mockAiSpeechRecommendations],
      weeklyProgress: [...mockWeeklySpeechProgress],
      exercises: [...speechExercises],
    },
  }
}
