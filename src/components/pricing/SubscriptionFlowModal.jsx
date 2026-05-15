import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, X } from 'lucide-react'
import { FREE_TRIAL_WEEKS, formatTrialEndDate, getPlanById } from '../../mock/pricingPlans.js'
import { useSubscription } from '../../hooks/useSubscription.js'
import { GlowButton } from '../ui/GlowButton.jsx'

export function SubscriptionFlowModal() {
  const { flow, closeFlow, billingInterval, trialEndsAt } = useSubscription()
  const plan = flow.planId ? getPlanById(flow.planId) : null

  return (
    <AnimatePresence>
      {flow.open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm light:bg-slate-900/50"
            onClick={flow.loading ? undefined : closeFlow}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-glow backdrop-blur-2xl light:border-slate-200 light:bg-white"
          >
            <button
              type="button"
              disabled={flow.loading}
              onClick={closeFlow}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 disabled:opacity-40 light:border-slate-200 light:bg-slate-50 light:text-slate-800"
            >
              <X className="h-4 w-4" />
            </button>

            {flow.loading ? (
              <motion.div className="py-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-indigo-300 light:text-indigo-600" />
                <p className="mt-4 text-sm font-medium text-white light:text-slate-900">
                  {flow.mode === 'contact' ? 'Connecting you with sales…' : `Starting your ${FREE_TRIAL_WEEKS}-week free trial…`}
                </p>
                <p className="mt-2 text-xs text-slate-400 light:text-slate-600">
                  Demo only — full access during trial, no payment charged
                </p>
                <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                    initial={{ width: '8%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: flow.mode === 'contact' ? 1.5 : 2.1, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            ) : flow.mode === 'success' && plan ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15">
                  <CheckCircle2 className="h-6 w-6 text-emerald-300 light:text-emerald-700" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white light:text-slate-900">
                  Your {FREE_TRIAL_WEEKS}-week free trial has started
                </h2>
                <p className="mt-2 text-sm text-slate-300 light:text-slate-600">
                  You&apos;re on the {plan.name} plan ({plan.patientLimitLabel}) with full access to every LunaVoice feature.
                  {trialEndsAt ? (
                    <>
                      {' '}
                      Trial ends {formatTrialEndDate(trialEndsAt)} — then {billingInterval} billing applies (demo: no charge).
                    </>
                  ) : null}
                </p>
                <GlowButton type="button" className="mt-6 w-full" onClick={closeFlow}>
                  Continue to dashboard
                </GlowButton>
              </motion.div>
            ) : flow.mode === 'contact' ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <motion.div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/15">
                  <Mail className="h-6 w-6 text-indigo-200 light:text-indigo-700" />
                </motion.div>
                <h2 className="mt-4 text-lg font-semibold text-white light:text-slate-900">Enterprise sales contacted</h2>
                <p className="mt-2 text-sm text-slate-300 light:text-slate-600">
                  Our healthcare partnerships team will reach out within 1 business day to discuss HIPAA BAA, SSO, and
                  custom deployment for your organization.
                </p>
                <p className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400 light:border-slate-200 light:bg-slate-50 light:text-slate-600">
                  demo@lunavoice.health · Mock flow for hackathon
                </p>
                <GlowButton type="button" className="mt-6 w-full" onClick={closeFlow}>
                  Got it
                </GlowButton>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
