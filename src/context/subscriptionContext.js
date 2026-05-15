import { createContext } from 'react'

/** @typedef {import('../mock/pricingPlans.js').PlanId} PlanId */
/** @typedef {import('../mock/pricingPlans.js').BillingInterval} BillingInterval */

/**
 * @typedef {object} SubscriptionContextValue
 * @property {PlanId} planId
 * @property {BillingInterval} billingInterval
 * @property {number} patientsUsed
 * @property {string | null} trialEndsAt — ISO date when free trial ends
 * @property {boolean} isOnTrial
 * @property {number} trialDaysRemaining
 * @property {(interval: BillingInterval) => void} setBillingInterval
 * @property {(planId: PlanId) => void} setPlanId
 * @property {(planId: PlanId) => Promise<void>} startCheckout
 * @property {() => Promise<void>} startContactSales
 * @property {{ open: boolean, mode: 'checkout' | 'success' | 'contact' | null, planId: PlanId | null, loading: boolean }} flow
 * @property {() => void} closeFlow
 */

/** @type {SubscriptionContextValue} */
export const SubscriptionContext = createContext({
  planId: 'starter',
  billingInterval: 'monthly',
  patientsUsed: 240,
  trialEndsAt: null,
  isOnTrial: false,
  trialDaysRemaining: 0,
  setBillingInterval: () => {},
  setPlanId: () => {},
  startCheckout: async () => {},
  startContactSales: async () => {},
  flow: { open: false, mode: null, planId: null, loading: false },
  closeFlow: () => {},
})
