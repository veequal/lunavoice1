export const parentMessages = [
  {
    id: 'm1',
    from: 'Dr. Elena Ortiz',
    role: 'SLP',
    preview: 'Great session today — Avery nailed S-blends in short phrases. Homework is in the LunaVoice portal.',
    body: 'Great session today — Avery nailed S-blends in short phrases. Homework is in the LunaVoice portal.\n\nTip: model a slow “snake sound” before words like “spoon” and “star”.',
    sentAt: '2026-05-14T17:02:00Z',
    unread: true,
  },
  {
    id: 'm2',
    from: 'Care Team',
    role: 'Coordinator',
    preview: 'Your Tuesday appointment was confirmed for 4:15 PM PT.',
    body: 'Your Tuesday appointment was confirmed for 4:15 PM PT. Telehealth link will arrive 10 minutes prior.',
    sentAt: '2026-05-13T09:15:00Z',
    unread: false,
  },
  {
    id: 'm3',
    from: 'Dr. Elena Ortiz',
    role: 'SLP',
    preview: 'Weekly summary: steady progress on cluster targets; keep celebrating small wins.',
    body: 'Weekly summary: steady progress on cluster targets; keep celebrating small wins. If you notice fatigue, switch to 5-minute micro-practice blocks.',
    sentAt: '2026-05-10T20:40:00Z',
    unread: false,
  },
]

export const parentWeeklySummary = {
  weekOf: '2026-05-12',
  bullets: [
    'Avery improved consonant cluster accuracy by 6% in structured probes.',
    'Carryover improved in scripted routines; novel sentences still emerging.',
    'Engagement remained high; consider one “quiet voice” practice round nightly.',
  ],
  sentiment: 'reassuring',
}

export const parentSessionHistory = [
  { id: 'h1', date: '2026-05-14', title: 'S-blends — phrases', score: 88, durationMin: 50 },
  { id: 'h2', date: '2026-05-10', title: 'Cluster reduction — minimal pairs', score: 84, durationMin: 48 },
  { id: 'h3', date: '2026-05-07', title: 'Home practice review', score: 81, durationMin: 30 },
  { id: 'h4', date: '2026-05-03', title: 'Story retell + artic targets', score: 79, durationMin: 52 },
]

export const parentAppointments = [
  { id: 'a1', title: 'Telehealth — SLP follow-up', when: '2026-05-20T23:15:00Z', mode: 'Virtual', provider: 'Dr. Elena Ortiz' },
  { id: 'a2', title: 'In-person — assessment checkpoint', when: '2026-05-28T16:00:00Z', mode: 'Clinic', provider: 'Dr. Elena Ortiz' },
]

/** Fixed "today" anchor for stable demo dates */
export const parentCalendarAnchor = '2026-05-15'

export const parentWeekStrip = [
  { label: 'Mon', date: '2026-05-12', hasSession: true },
  { label: 'Tue', date: '2026-05-13', hasSession: false },
  { label: 'Wed', date: '2026-05-14', hasSession: true },
  { label: 'Thu', date: '2026-05-15', hasSession: true },
  { label: 'Fri', date: '2026-05-16', hasSession: false },
  { label: 'Sat', date: '2026-05-17', hasSession: false },
  { label: 'Sun', date: '2026-05-18', hasSession: true },
]

export const parentMinutesSeries = [
  { week: 'Apr W3', minutes: 62 },
  { week: 'Apr W4', minutes: 74 },
  { week: 'May W1', minutes: 81 },
  { week: 'May W2', minutes: 88 },
]

export const parentPronunciationSeries = [
  { week: 'Apr W3', pct: 71 },
  { week: 'Apr W4', pct: 75 },
  { week: 'May W1', pct: 79 },
  { week: 'May W2', pct: 84 },
]

export const parentChildProfile = {
  name: 'Avery Patel',
  age: 6,
  improvementPct: 18,
  sparkline: [62, 64, 67, 70, 74, 78, 81, 84],
}

export const parentNotifications = [
  { id: 'pn1', title: 'Homework posted', body: 'New 10-minute routine available.', time: '2h ago', unread: true },
  { id: 'pn2', title: 'Appointment reminder', body: 'Tuesday telehealth at 4:15 PM PT.', time: 'Today', unread: false },
]
