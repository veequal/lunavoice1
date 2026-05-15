import { GlassPanel } from '../ui/GlassPanel.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import { cn } from '../../lib/cn.js'

export function ChartCard({ title, subtitle, children, isLoading, className = '' }) {
  return (
    <GlassPanel className={cn('relative overflow-hidden', className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white light:text-slate-900">{title}</p>
          {subtitle ? <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{subtitle}</p> : null}
        </div>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      ) : (
        <div className="h-48 w-full min-w-0 overflow-x-auto sm:h-56">{children}</div>
      )}
    </GlassPanel>
  )
}

