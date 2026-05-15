/**
 * ASR + speech coaching mock payloads — "AUTOMATIC SPEECH RECOGNITION SYSTEM FOR CHILDREN WITH SPEECH IMPAIRMENT"
 */

export const mockSpeechScores = {
  patientId: 'p1',
  childDisplayName: 'Avery',
  pronunciationScore: 86,
  clarityPct: 84,
  confidencePct: 78,
  weekOverWeekDeltaPct: 6,
  lastUpdated: '2026-05-14T18:00:00Z',
}

export const mockWeeklySpeechProgress = [
  { week: 'Apr W3', score: 68, clarity: 71, practiceMin: 62 },
  { week: 'Apr W4', score: 72, clarity: 74, practiceMin: 74 },
  { week: 'May W1', score: 79, clarity: 78, practiceMin: 81 },
  { week: 'May W2', score: 86, clarity: 84, practiceMin: 88 },
]

export const mockSpeechSessions = [
  {
    id: 'ss1',
    date: '2026-05-14',
    exerciseId: 'ex1',
    exerciseTitle: 'Tongue Twister',
    pronunciation: 88,
    clarity: 85,
    feedback: 'Excellent pacing — try one notch slower on the second rep.',
  },
  {
    id: 'ss2',
    date: '2026-05-13',
    exerciseId: 'ex2',
    exerciseTitle: 'Word Ladder',
    pronunciation: 82,
    clarity: 80,
    feedback: 'Great vowel precision on “fin”; watch the /n/ contact.',
  },
]

export const mockAiSpeechRecommendations = [
  {
    id: 'ar1',
    title: 'Target: S-blends in short phrases',
    rationale: 'Probe data shows strongest gains when clusters appear after a carrier phrase.',
    action: 'Practice 10 “I see a ___” stems with SP/ST words tonight.',
    confidence: 0.87,
  },
  {
    id: 'ar2',
    title: 'Phoneme: /r/ medial (carryover)',
    rationale: 'Accuracy dips slightly when fatigued; shorter sessions beat long marathons.',
    action: 'Split into two 4-minute rounds with a movement break.',
    confidence: 0.83,
  },
]

export const mockPronunciationFeedback = {
  phonemeFocus: '/s/ clusters',
  stressPattern: 'Equal stress — good control',
  commonErrors: [
    { label: 'Cluster reduction', severity: 'mild', tip: 'Hold the first sound a half-beat longer before the blend.' },
    { label: 'Vowel neutralization', severity: 'watch', tip: 'Smile on the vowel in “see” to keep it bright.' },
  ],
  modelWaveformMeta: { sampleRateHz: 16000, frameMs: 20, simulated: true },
}

export const mockChildAchievements = [
  { id: 'b1', label: 'Bright Start', icon: 'flame', earned: true, speechScoreAtUnlock: 62 },
  { id: 'b2', label: 'Sound Scout', icon: 'sparkles', earned: true, speechScoreAtUnlock: 71 },
  { id: 'b3', label: 'Word Wizard', icon: 'book', earned: true, speechScoreAtUnlock: 79 },
  { id: 'b4', label: 'Super Speaker', icon: 'mic', earned: false, speechScoreAtUnlock: 90 },
]

export const mockEncouragementCards = [
  { id: 'c1', text: 'You’re doing amazing — tiny tries make big changes!', mood: 'celebrate' },
  { id: 'c2', text: 'Great focus! Your sounds are getting clearer each day.', mood: 'calm' },
  { id: 'c3', text: 'High five! Ready for one more super strong try?', mood: 'energy' },
]
