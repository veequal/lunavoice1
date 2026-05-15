import { useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function LunaVoiceLogo({ className = '', size = 'md' }) {
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
  }
  const reduced = useReducedMotion()
  const gradId = useId().replace(/:/g, 'lv')

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <motion.div
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-glow-sm light:border-slate-200 light:bg-white"
        animate={reduced ? undefined : { rotate: [0, 1.5, -1.5, 0] }}
        transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/40 to-violet-500/30 blur-md" />
        <svg className="relative h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#d8b4fe" />
            </linearGradient>
          </defs>
          <path
            d="M12 3a9 9 0 1 0 9 9 7.5 7.5 0 0 1-9-9Z"
            fill={`url(#${gradId})`}
            className="drop-shadow-[0_0_6px_rgba(167,139,250,0.45)]"
          />
        </svg>
      </motion.div>
      <div className="leading-tight">
        <p className={cn('font-semibold tracking-tight text-white light:text-slate-900', sizes[size])}>LunaVoice</p>
        <p className="text-xs text-slate-400 light:text-slate-600">AI pediatric speech care</p>
      </div>
    </div>
  )
}
