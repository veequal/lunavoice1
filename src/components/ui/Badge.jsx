import { cn } from '../../lib/cn.js'

const toneMap = {
  default: 'border-white/10 bg-white/5 text-slate-200 light:bg-slate-900/5 light:text-slate-800',
  success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200',
  warning: 'border-amber-500/25 bg-amber-500/10 text-amber-200',
  danger: 'border-rose-500/25 bg-rose-500/10 text-rose-200',
  info: 'border-sky-500/25 bg-sky-500/10 text-sky-200',
}

export function Badge({ children, tone = 'default', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        toneMap[tone] ?? toneMap.default,
        className,
      )}
    >
      {children}
    </span>
  )
}
