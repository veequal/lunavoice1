import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { cn } from '../../lib/cn.js'

export function SpeechWave({ active, className, variant = 'game' }) {
  const reduced = useReducedMotion()
  const bars = 16
  const heights = [12, 28, 48, 36, 56, 40, 64, 44, 58, 32, 50, 24, 38, 20, 46, 30]

  const barClass =
    variant === 'game'
      ? 'bg-gradient-to-t from-amber-400/30 via-fuchsia-400/80 to-cyan-300/90'
      : 'bg-gradient-to-t from-cyan-400/20 to-indigo-300/90'

  return (
    <motion.div
      className={cn('flex h-28 items-end justify-center gap-1.5', className)}
      initial={false}
      animate={{ opacity: active ? 1 : 0.65 }}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => {
        const delay = i * 0.04
        const peak = heights[i] ?? 24
        return (
          <motion.div
            key={i}
            className={cn('w-1.5 rounded-full', barClass)}
            initial={false}
            animate={
              active && !reduced
                ? { height: [10, peak, 16, Math.round(peak * 0.7), 20] }
                : { height: active ? Math.round(peak * 0.4) : 6 }
            }
            transition={
              active && !reduced
                ? { duration: 0.85, repeat: Infinity, ease: 'easeInOut', delay }
                : { duration: 0.25 }
            }
          />
        )
      })}
    </motion.div>
  )
}
