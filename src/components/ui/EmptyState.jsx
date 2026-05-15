import { Sparkles } from 'lucide-react'
import { GlassPanel } from './GlassPanel.jsx'

export function EmptyState({ title, description, icon: Icon = Sparkles }) {
  return (
    <GlassPanel className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-indigo-200">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-semibold text-white light:text-slate-900">{title}</p>
        {description ? <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{description}</p> : null}
      </div>
    </GlassPanel>
  )
}
