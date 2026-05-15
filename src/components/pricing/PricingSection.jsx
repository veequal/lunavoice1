import { motion } from 'framer-motion'
import { PRICING_SECTION, pricingPlans } from '../../mock/pricingPlans.js'
import { useSubscription } from '../../hooks/useSubscription.js'
import { BillingToggle } from './BillingToggle.jsx'
import { PricingCard } from './PricingCard.jsx'

export function PricingSection() {
  const { billingInterval, setBillingInterval } = useSubscription()

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-white/10 py-14 light:border-slate-200 sm:py-20 md:py-24">
      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200/90 light:text-indigo-700"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {PRICING_SECTION.eyebrow}
        </motion.p>
        <motion.h2
          className="mx-auto mt-4 max-w-3xl text-balance text-center text-3xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {PRICING_SECTION.title}
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-400 light:text-slate-600"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          {PRICING_SECTION.subtitle}
        </motion.p>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-sm font-medium text-emerald-200/95 light:text-emerald-800"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {PRICING_SECTION.trialBanner}
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <BillingToggle value={billingInterval} onChange={setBillingInterval} />
        </motion.div>

        <motion.div
          className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-xs text-slate-500 light:text-slate-500">
          All plans include a 2-week free trial with full platform access, then billing in Malaysian Ringgit (MYR). Demo
          checkout; no payment charged during trial.
        </p>
      </motion.div>
    </section>
  )
}
