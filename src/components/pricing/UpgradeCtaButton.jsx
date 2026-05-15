import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '../../lib/cn.js'

/** @param {{ onClick?: () => void, className?: string, compact?: boolean }} props */
export function UpgradeCtaButton({ onClick, className = '', compact = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-indigo-400/35 bg-gradient-to-r from-indigo-500/20 via-violet-500/15 to-cyan-500/10 px-3 py-2 text-sm font-semibold text-indigo-100 shadow-glow-sm backdrop-blur-xl transition-shadow hover:shadow-glow light:border-indigo-300/60 light:from-indigo-100 light:via-violet-50 light:to-cyan-50 light:text-indigo-900',
        compact && '!px-2.5 !py-1.5 text-xs',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <Sparkles className={cn('h-4 w-4 text-indigo-300 light:text-indigo-600', compact && 'h-3.5 w-3.5')} />
      <span className="relative">{compact ? 'Pricing' : 'View Pricing'}</span>
    </motion.button>
  )
}
