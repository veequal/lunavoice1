import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  MOCK_PATIENTS_USED,
  computeTrialEndsAt,
  getTrialDaysRemaining,
  isTrialActive,
} from '../mock/pricingPlans.js'
import { SubscriptionContext } from './subscriptionContext.js'

const STORAGE_KEY = 'lunavoice-subscription'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function SubscriptionProvider({ children }) {
  const stored = readStored()
  const initialPlanId = stored?.planId === 'enterprise' ? 'compact' : (stored?.planId ?? 'starter')
  const [planId, setPlanIdState] = useState(initialPlanId)
  const [billingInterval, setBillingInterval] = useState(stored?.billingInterval ?? 'monthly')
  const [trialEndsAt, setTrialEndsAt] = useState(stored?.trialEndsAt ?? null)
  const [patientsUsed] = useState(MOCK_PATIENTS_USED)
  const [flow, setFlow] = useState({
    open: false,
    mode: /** @type {'checkout' | 'success' | 'contact' | null} */ (null),
    planId: /** @type {import('../mock/pricingPlans.js').PlanId | null} */ (null),
    loading: false,
  })
  const timerRef = useRef(null)

  const onTrial = isTrialActive(trialEndsAt)
  const trialDaysRemaining = getTrialDaysRemaining(trialEndsAt)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ planId, billingInterval, trialEndsAt }),
    )
  }, [planId, billingInterval, trialEndsAt])

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const closeFlow = useCallback(() => {
    setFlow({ open: false, mode: null, planId: null, loading: false })
  }, [])

  const startCheckout = useCallback(async (nextPlanId) => {
    setFlow({ open: true, mode: 'checkout', planId: nextPlanId, loading: true })
    await new Promise((resolve) => {
      timerRef.current = window.setTimeout(resolve, 2200)
    })
    const endsAt = computeTrialEndsAt()
    setPlanIdState(nextPlanId)
    setTrialEndsAt(endsAt)
    setFlow({ open: true, mode: 'success', planId: nextPlanId, loading: false })
  }, [])

  const startContactSales = useCallback(async () => {
    setFlow({ open: true, mode: 'contact', planId: 'compact', loading: true })
    await new Promise((resolve) => {
      timerRef.current = window.setTimeout(resolve, 1600)
    })
    setFlow({ open: true, mode: 'contact', planId: 'compact', loading: false })
  }, [])

  const value = useMemo(
    () => ({
      planId,
      billingInterval,
      patientsUsed,
      trialEndsAt,
      isOnTrial: onTrial,
      trialDaysRemaining,
      setBillingInterval,
      setPlanId: setPlanIdState,
      startCheckout,
      startContactSales,
      flow,
      closeFlow,
    }),
    [
      planId,
      billingInterval,
      patientsUsed,
      trialEndsAt,
      onTrial,
      trialDaysRemaining,
      startCheckout,
      startContactSales,
      flow,
      closeFlow,
    ],
  )

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}
