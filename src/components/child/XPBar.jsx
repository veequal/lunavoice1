import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { cn } from '../../lib/cn.js'

export function XPBar({ xp, level, nextLevelXp = 100, streak = 0, stars = 0, className }) {
  const reduced = useReducedMotion()
  const pct = Math.min(100, Math.round((xp / nextLevelXp) * 100))

  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-white/10 bg-slate-900/45 p-4 shadow-glass backdrop-blur-xl light:border-slate-200 light:bg-white/75',
        className,
      )}
      initial={reduced ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="flex flex-wrap items-center justify-between gap-3"
        initial={reduced ? undefined : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90 light:text-amber-800">Level {level}</p>
          <p className="mt-0.5 text-lg font-semibold text-white light:text-slate-900">
            {xp} <span className="text-sm font-medium text-slate-400 light:text-slate-600">/ {nextLevelXp} XP</span>
          </p>
        </div>
        <motion.div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-100">
            <Star className="h-3.5 w-3.5" />
            {stars}
          </div>
          <motion.div
            className="flex items-center gap-1.5 rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
            animate={streak > 0 && !reduced ? { scale: [1, 1.04, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {streak} streak
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 light:bg-slate-900/5 light:ring-slate-200">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-fuchsia-400 to-violet-400"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}
