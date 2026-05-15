import { AlertTriangle, RefreshCw } from 'lucide-react'
import { GlowButton } from './GlowButton.jsx'

export function ApiErrorBanner({ message, onRetry, className = '' }) {
  if (!message) return null
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between light:border-amber-200 light:bg-amber-50 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-200 light:text-amber-700" />
        <div>
          <p className="text-sm font-semibold text-white light:text-slate-900">Connection simulation</p>
          <p className="mt-1 text-sm text-slate-200 light:text-slate-700">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <GlowButton type="button" variant="secondary" className="shrink-0" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </GlowButton>
      ) : null}
    </div>
  )
}
