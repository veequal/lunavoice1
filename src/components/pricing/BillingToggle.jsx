import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'

/** @param {{ value: 'monthly' | 'annual', onChange: (v: 'monthly' | 'annual') => void }} props */
export function BillingToggle({ value, onChange }) {
  return (
    <motion.div
      className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/50 p-1.5 backdrop-blur-xl sm:gap-3 light:border-slate-200 light:bg-white/80"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {(['monthly', 'annual']).map((interval) => {
        const active = value === interval
        return (
          <button
            key={interval}
            type="button"
            onClick={() => onChange(interval)}
            className={cn(
              'relative rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors',
              active ? 'text-white light:text-slate-900' : 'text-slate-400 hover:text-slate-200 light:text-slate-600',
            )}
          >
            {active ? (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/80 to-violet-500/80 shadow-glow-sm light:from-indigo-200 light:to-violet-200"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{interval}</span>
          </button>
        )
      })}
      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-200 sm:text-[11px] light:text-emerald-800">
        Save 15%
      </span>
    </motion.div>
  )
}
