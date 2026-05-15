import { motion } from 'framer-motion'
import { Brain, Mic, Sparkles, Trophy, Volume2 } from 'lucide-react'
import { TUTORIAL_STEPS } from '../../mock/gameWords.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { cn } from '../../lib/cn.js'

const stepIcons = {
  sparkles: Sparkles,
  mic: Mic,
  volume: Volume2,
  brain: Brain,
  trophy: Trophy,
}

export function GameTutorial({ className }) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      className={cn('space-y-4', className)}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h2 className="text-lg font-semibold text-white light:text-slate-900">How It Works</h2>
        <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Follow these steps to earn stars and XP.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TUTORIAL_STEPS.map((step, i) => {
          const Icon = stepIcons[step.icon] ?? Sparkles
          return (
            <motion.div
              key={step.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-amber-400/30 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(251,191,36,0.12)] light:border-slate-200 light:bg-white/80 light:hover:border-amber-300/50"
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={reduced ? undefined : { y: -3, scale: 1.01 }}
            >
              <motion.div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/25 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 text-violet-100 light:text-violet-700"
                whileHover={reduced ? undefined : { rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/80 light:text-amber-800">Step {step.id}</p>
              <p className="mt-1 text-sm font-semibold text-white light:text-slate-900">{step.title}</p>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{step.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
