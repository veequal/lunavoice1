import { cn } from '../../lib/cn.js'

export function SectionHeader({ eyebrow, title, description, action, className = '' }) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300/90 light:text-indigo-700">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-white light:text-slate-900">{title}</h2>
        {description ? <p className="mt-1 max-w-prose text-sm text-slate-400 light:text-slate-600">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
