import { cn } from '../../lib/cn.js'

export function SectionHeader({ eyebrow, title, description, action, className = '' }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-4 lg:gap-y-2', className)}>
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300/90 light:text-indigo-700">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-white light:text-slate-900">{title}</h2>
        {description ? <p className="mt-1 max-w-prose text-sm text-slate-400 light:text-slate-600">{description}</p> : null}
      </div>
      {action ? <div className="w-full shrink-0 sm:w-auto">{action}</div> : null}
    </div>
  )
}
