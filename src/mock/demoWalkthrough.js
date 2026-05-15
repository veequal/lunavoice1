/** @typedef {object} DemoScene
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} tooltip
 * @property {number} durationMs
 */

/** @type {DemoScene[]} */
export const demoScenes = [
  {
    id: 'parent-login',
    title: 'Parent signs in',
    subtitle: 'Secure family hub with live progress',
    tooltip: 'Track child progress instantly',
    durationMs: 4200,
  },
  {
    id: 'child-practice',
    title: 'Child practice session',
    subtitle: 'Playful speech exercises with mic coaching',
    tooltip: 'Guided home practice for carryover',
    durationMs: 4500,
  },
  {
    id: 'ai-analysis',
    title: 'AI pronunciation analysis',
    subtitle: 'Real-time phoneme scoring & clarity index',
    tooltip: 'AI analyzes pronunciation in real-time',
    durationMs: 4200,
  },
  {
    id: 'therapist-review',
    title: 'Therapist reviews cohort',
    subtitle: 'Clinical dashboards & AI session summaries',
    tooltip: 'Therapists see population insights at a glance',
    durationMs: 4200,
  },
  {
    id: 'book-appointment',
    title: 'Book with care team',
    subtitle: 'Parents schedule visits in one flow',
    tooltip: 'Book appointments with therapists',
    durationMs: 4000,
  },
  {
    id: 'secure-records',
    title: 'Secure records & AI notes',
    subtitle: 'HIPAA-ready vault with generated documentation',
    tooltip: 'Secure healthcare-grade records',
    durationMs: 4500,
  },
]

export const DEMO_SECTION = {
  eyebrow: 'Product tour',
  title: 'See LunaVoice in Action',
  headline: 'Experience AI-Powered Speech Therapy',
  subtitle:
    'See how LunaVoice helps children, parents, and therapists collaborate through intelligent speech analysis and secure healthcare workflows.',
}

export const TOTAL_DEMO_MS = demoScenes.reduce((sum, s) => sum + s.durationMs, 0)
