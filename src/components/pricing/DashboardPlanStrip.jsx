import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowUpRight } from 'lucide-react'
import {
  getPlanById,
  getUsagePercent,
  isUsageWarning,
} from '../../mock/pricingPlans.js'
import { useSubscription } from '../../hooks/useSubscription.js'
import { Badge } from '../ui/Badge.jsx'
import { cn } from '../../lib/cn.js'

/** @param {{ accent?: 'indigo' | 'teal' | 'amber' }} props */
export function DashboardPlanStrip({ accent = 'indigo' }) {
  const { planId, patientsUsed, isOnTrial, trialDaysRemaining } = useSubscription()
  const plan = getPlanById(planId)
  const max = plan.patientLimitMax
  const pct = getUsagePercent(patientsUsed, max)
  const warning = isUsageWarning(patientsUsed, max)

  const barColor =
    accent === 'teal'
      ? 'from-teal-400 to-cyan-300'
      : accent === 'amber'
        ? 'from-amber-400 to-orange-300'
        : 'from-indigo-400 to-violet-400'

  return (
    <motion.div
      className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-xl light:border-slate-200 light:bg-white/80 sm:flex-row sm:items-center sm:gap-4"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div className="flex flex-wrap items-center gap-2">
        <Badge tone="info" className="!text-[11px]">
          {plan.name} Plan
        </Badge>
        {isOnTrial ? (
          <Badge tone="success" className="!text-[11px]">
            Free trial · {trialDaysRemaining}d left
          </Badge>
        ) : null}
        <span className="text-[11px] font-medium text-slate-300 light:text-slate-700">
          {patientsUsed} / {max} patients used
        </span>
      </motion.div>

      {max != null ? (
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-xs">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
            <motion.div
              className={cn('h-full rounded-full bg-gradient-to-r', barColor)}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="text-[10px] font-semibold text-slate-400 light:text-slate-600">{pct}%</span>
        </div>
      ) : null}

      {warning ? (
        <Link
          to="/#pricing"
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-100 transition hover:bg-amber-500/20 light:text-amber-900"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          Increase capacity
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      ) : (
        <Link
          to="/#pricing"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-200 transition hover:text-white light:text-indigo-700 light:hover:text-indigo-900"
        >
          Change plan
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}
    </motion.div>
  )
}
