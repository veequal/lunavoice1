import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'
import { GlassPanel } from './GlassPanel.jsx'
import { Skeleton } from './Skeleton.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function StatCard({ icon: Icon, label, value, delta, hint, loading, className = '' }) {
  const reduced = useReducedMotion()
  if (loading) {
    return (
      <GlassPanel className={cn('h-[124px]', className)} glow>
        <Skeleton className="mb-3 h-4 w-24" />
        <Skeleton className="mb-2 h-8 w-20" />
        <Skeleton className="h-3 w-40" />
      </GlassPanel>
    )
  }

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.22 }}
    >
      <GlassPanel className={cn('relative overflow-hidden', className)} glow>
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/15 blur-2xl" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 light:text-slate-600">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white light:text-slate-900">{value}</p>
            {delta ? <p className="mt-1 text-xs text-emerald-300/90 light:text-emerald-700">{delta}</p> : null}
            {hint ? <p className="mt-2 text-xs text-slate-500 light:text-slate-600">{hint}</p> : null}
          </div>
          {Icon ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-200 light:border-slate-200 light:bg-white light:text-indigo-600">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
          ) : null}
        </div>
      </GlassPanel>
    </motion.div>
  )
}
