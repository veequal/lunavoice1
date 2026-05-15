import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FREE_TRIAL_LABEL, formatMyr, getDisplayMonthlyPrice } from '../../mock/pricingPlans.js'
import { useSubscription } from '../../hooks/useSubscription.js'
import { GlowButton } from '../ui/GlowButton.jsx'
import { cn } from '../../lib/cn.js'

/** @param {{ plan: import('../../mock/pricingPlans.js').PricingPlan, index: number }} props */
export function PricingCard({ plan, index }) {
  const { billingInterval, startCheckout, planId: currentPlanId } = useSubscription()
  const price = getDisplayMonthlyPrice(plan, billingInterval)
  const isCurrent = currentPlanId === plan.id

  const onCta = () => {
    startCheckout(plan.id)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: plan.recommended ? 1.02 : 1.01 }}
      className={cn(
        'relative flex flex-col rounded-3xl border p-6 shadow-glass backdrop-blur-2xl transition-shadow',
        plan.recommended
          ? 'border-indigo-400/45 bg-gradient-to-b from-indigo-500/15 via-slate-950/60 to-slate-950/80 shadow-glow light:from-indigo-50 light:via-white light:to-white light:border-indigo-300/50'
          : 'border-white/10 bg-slate-950/45 light:border-slate-200 light:bg-white/85',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/90 light:text-indigo-700">{plan.name}</p>
      <span className="mt-3 inline-flex w-fit items-center rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200 light:text-emerald-800">
        {FREE_TRIAL_LABEL} included
      </span>
      <motion.div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-white light:text-slate-900">{formatMyr(price)}</span>
        <span className="text-sm text-slate-400 light:text-slate-600">/month</span>
      </motion.div>
      <p className="mt-1 text-xs text-emerald-300/90 light:text-emerald-700">
        Try free for 2 weeks, then {formatMyr(price)}/month
        {billingInterval === 'annual' ? ' · 15% off with annual billing' : ''}
      </p>

      <p className="mt-4 text-sm font-medium text-slate-200 light:text-slate-800">{plan.patientLimitLabel}</p>
      <ul className="mt-2 space-y-1">
        {plan.recommendedFor.map((line) => (
          <li key={line} className="text-xs text-slate-400 light:text-slate-600">
            {line}
          </li>
        ))}
      </ul>

      <div className="my-5 h-px bg-white/10 light:bg-slate-200" />

      <p className="mb-3 text-xs font-medium text-indigo-200/80 light:text-indigo-700">Same full access on every plan</p>
      <ul className="flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-slate-300 light:text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300 light:text-teal-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <GlowButton
        type="button"
        variant={plan.recommended ? 'primary' : 'secondary'}
        className={cn('mt-6 w-full', isCurrent && 'opacity-70')}
        disabled={isCurrent}
        onClick={onCta}
      >
        {isCurrent ? 'Current plan' : plan.ctaLabel}
      </GlowButton>
    </motion.article>
  )
}
