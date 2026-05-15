import { AnimatePresence, motion } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function AchievementPopup({ open, achievement, onClose }) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {open && achievement ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close achievement"
          />
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-amber-400/30 bg-slate-900/90 p-6 shadow-[0_0_48px_rgba(251,191,36,0.25)] backdrop-blur-2xl light:bg-white/95"
            initial={reduced ? undefined : { scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduced ? undefined : { scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            {!reduced ? (
              <>
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="pointer-events-none absolute h-2 w-2 rounded-full"
                    style={{
                      left: `${10 + (i % 4) * 22}%`,
                      top: `${15 + Math.floor(i / 4) * 25}%`,
                      background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#e879f9' : '#67e8f9',
                    }}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.4], y: [-8, -40 - i * 4] }}
                    transition={{ duration: 1.2, delay: i * 0.05 }}
                  />
                ))}
              </>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/35 bg-gradient-to-br from-amber-400/25 to-fuchsia-500/20 text-3xl"
                animate={reduced ? undefined : { rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.6 }}
              >
                {achievement.emoji ?? <Trophy className="h-8 w-8 text-amber-200" />}
              </motion.div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200 light:text-amber-800">Achievement unlocked!</p>
              <p className="mt-2 text-xl font-semibold text-white light:text-slate-900">{achievement.label}</p>
              {achievement.xp ? (
                <p className="mt-2 text-sm text-fuchsia-200 light:text-fuchsia-700">+{achievement.xp} XP bonus</p>
              ) : null}
              <GlowButton type="button" onClick={onClose} className="mt-6 w-full">
                Awesome!
              </GlowButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
