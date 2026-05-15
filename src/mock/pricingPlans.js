/** @typedef {'compact' | 'starter' | 'professional'} PlanId */
/** @typedef {'monthly' | 'annual'} BillingInterval */

/** Free trial length included with every plan. */
export const FREE_TRIAL_WEEKS = 2
export const FREE_TRIAL_DAYS = FREE_TRIAL_WEEKS * 7
export const FREE_TRIAL_LABEL = `${FREE_TRIAL_WEEKS}-week free trial`
export const FREE_TRIAL_CTA_LABEL = `Start ${FREE_TRIAL_WEEKS}-Week Free Trial`

/** Full app access — identical on every plan; price only reflects patient capacity. */
export const FULL_PLATFORM_ACCESS = [
  `${FREE_TRIAL_LABEL} on every plan — full access, no card required for demo`,
  'Full platform access — doctor, parent & child dashboards',
  'AI speech analytics & pronunciation coaching',
  'Speech adventure games & practice studio',
  'Appointment booking & scheduling',
  'Secure patient records & progress tracking',
  'Multi-therapist & family collaboration',
  'Reporting, rewards & progress analytics',
  'HIPAA-ready architecture, audit logging & role-based access',
  'Email & in-app support',
]

/**
 * @typedef {object} PricingPlan
 * @property {PlanId} id
 * @property {string} name
 * @property {number} monthlyPrice — MYR (Malaysian Ringgit) per month
 * @property {string} patientLimitLabel
 * @property {number} patientLimitMax
 * @property {string[]} recommendedFor
 * @property {string[]} features
 * @property {boolean} recommended
 * @property {'trial' | 'upgrade'} ctaType
 * @property {string} ctaLabel
 */

/** @type {PricingPlan[]} */
export const pricingPlans = [
  {
    id: 'compact',
    name: 'Compact',
    monthlyPrice: 1400,
    patientLimitLabel: 'Less than 100 patients',
    patientLimitMax: 99,
    recommendedFor: ['Solo practitioners', 'Boutique therapy rooms', 'Pilot programs'],
    features: FULL_PLATFORM_ACCESS,
    recommended: false,
    ctaType: 'trial',
    ctaLabel: FREE_TRIAL_CTA_LABEL,
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 4000,
    patientLimitLabel: 'Up to 300 patients',
    patientLimitMax: 300,
    recommendedFor: ['Small clinics', 'Independent therapy centers', 'Growing practices'],
    features: FULL_PLATFORM_ACCESS,
    recommended: false,
    ctaType: 'trial',
    ctaLabel: FREE_TRIAL_CTA_LABEL,
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 8000,
    patientLimitLabel: '301–1,000 patients',
    patientLimitMax: 1000,
    recommendedFor: ['Multi-therapist clinics', 'Regional therapy networks', 'Hospital outpatient units'],
    features: FULL_PLATFORM_ACCESS,
    recommended: false,
    ctaType: 'trial',
    ctaLabel: FREE_TRIAL_CTA_LABEL,
  },
]

export const PRICING_SECTION = {
  eyebrow: 'Plans & billing',
  title: 'Simple Pricing in Malaysian Ringgit',
  subtitle:
    'Every plan starts with a 2-week free trial and the same full LunaVoice experience. Choose the tier that fits your patient volume.',
  trialBanner: '2-week free trial · Full platform access on every plan',
}

/** Demo usage shown on dashboards (hackathon mock). */
export const MOCK_PATIENTS_USED = 240

/** @param {string} id */
export function getPlanById(id) {
  const resolved = id === 'enterprise' ? 'compact' : id
  return pricingPlans.find((p) => p.id === resolved) ?? pricingPlans[1]
}

/** @param {PricingPlan} plan @param {BillingInterval} interval */
export function getDisplayMonthlyPrice(plan, interval) {
  if (interval === 'annual') return Math.round(plan.monthlyPrice * 0.85)
  return plan.monthlyPrice
}

/** Format MYR for display (e.g. RM 4,000). */
export function formatMyr(amount) {
  return `RM ${amount.toLocaleString('en-MY')}`
}

/** @returns {string} ISO date when a trial started now would end. */
export function computeTrialEndsAt(fromDate = new Date()) {
  const end = new Date(fromDate)
  end.setDate(end.getDate() + FREE_TRIAL_DAYS)
  return end.toISOString()
}

/** @param {string | null | undefined} trialEndsAt */
export function isTrialActive(trialEndsAt) {
  if (!trialEndsAt) return false
  return new Date(trialEndsAt).getTime() > Date.now()
}

/** @param {string | null | undefined} trialEndsAt */
export function formatTrialEndDate(trialEndsAt) {
  if (!trialEndsAt) return ''
  return new Date(trialEndsAt).toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** @param {string | null | undefined} trialEndsAt */
export function getTrialDaysRemaining(trialEndsAt) {
  if (!trialEndsAt || !isTrialActive(trialEndsAt)) return 0
  const ms = new Date(trialEndsAt).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

/** @param {number} used @param {number | null} max */
export function getUsagePercent(used, max) {
  if (max == null) return 0
  return Math.min(100, Math.round((used / max) * 100))
}

/** @param {number} used @param {number | null} max */
export function isUsageWarning(used, max) {
  if (max == null) return false
  return used / max >= 0.8
}
