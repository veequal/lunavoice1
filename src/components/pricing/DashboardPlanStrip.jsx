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
      className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-xl light:border-slate-200 light:bg-white/80"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Badge tone="info" className="!text-[11px]">
            {plan.name} Plan
          </Badge>
          {isOnTrial ? (
            <Badge tone="success" className="!text-[11px]">
              Free trial · {trialDaysRemaining}d left
            </Badge>
          ) : null}
          <span className="whitespace-nowrap text-[11px] font-medium text-slate-300 light:text-slate-700">
            {patientsUsed} / {max} patients used
          </span>
        </div>

        {max != null ? (
          <motion.div className="flex min-w-[9rem] flex-[1_1_9rem] max-w-full items-center gap-2 sm:max-w-[11rem] lg:max-w-[13rem]">
            <motion.div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
              <motion.div
                className={cn('h-full rounded-full bg-gradient-to-r', barColor)}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
            <span className="shrink-0 text-[10px] font-semibold tabular-nums text-slate-400 light:text-slate-600">
              {pct}%
            </span>
          </motion.div>
        ) : null}

        {warning ? (
          <Link
            to="/#pricing"
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-100 transition hover:bg-amber-500/20 light:text-amber-900"
          >
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            Increase capacity
            <ArrowUpRight className="h-3 w-3 shrink-0" />
          </Link>
        ) : (
          <Link
            to="/#pricing"
            className="ml-auto inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-indigo-200 transition hover:text-white light:text-indigo-700 light:hover:text-indigo-900"
          >
            Change plan
            <ArrowUpRight className="h-3 w-3 shrink-0" />
          </Link>
        )}
      </motion.div>
    </motion.div>
  )
}
