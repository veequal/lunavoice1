import { cn } from '../../lib/cn.js'

export function GlassPanel({ children, className = '', glow = false, padding = 'p-5' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-slate-900/45 shadow-glass backdrop-blur-xl',
        'dark:border-white/10',
        'light:border-slate-200/80 light:bg-white/70',
        glow && 'shadow-glow-sm ring-1 ring-indigo-500/20',
        padding,
        className,
      )}
    >
      {children}
    </div>
  )
}
