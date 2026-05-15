import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'

export function GlowButton({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  ...rest
}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-45'

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-glow-sm hover:from-indigo-400 hover:to-violet-400',
    secondary:
      'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 light:border-slate-200 light:bg-slate-900/5 light:text-slate-900',
    ghost: 'bg-transparent text-slate-200 hover:bg-white/5 light:text-slate-800 light:hover:bg-slate-900/5',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(base, variants[variant] ?? variants.primary, className)}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
