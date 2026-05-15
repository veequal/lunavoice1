import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function SpeechWaveVisualizer({ active }) {
  const reduced = useReducedMotion()
  const bars = 14
  const heights = [10, 26, 44, 32, 52, 38, 60, 42, 54, 30, 46, 22, 34, 18]

  return (
    <div className="flex h-24 items-end justify-center gap-1.5" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const delay = i * 0.05
        const peak = heights[i] ?? 24
        return (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-cyan-400/20 to-indigo-300/90"
            initial={false}
            animate={
              active && !reduced
                ? { height: [12, peak, 18, Math.round(peak * 0.65), 22] }
                : { height: active ? Math.round(peak * 0.35) : 8 }
            }
            transition={
              active && !reduced
                ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay }
                : { duration: 0.25 }
            }
          />
        )
      })}
    </div>
  )
}
