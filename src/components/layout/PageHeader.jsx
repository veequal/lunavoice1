import { Link } from 'react-router-dom'
import { ArrowLeft, Menu } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'

/** @param {{ title: string, subtitle?: string, showBack?: boolean, onMenuClick?: () => void, showMenuTrigger?: boolean, planSlot?: import('react').ReactNode }} props */
export function PageHeader({ title, subtitle, showBack = true, onMenuClick, showMenuTrigger, planSlot }) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/40 px-4 py-4 backdrop-blur-xl light:border-slate-200 light:bg-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-3">
        {showMenuTrigger && onMenuClick ? (
          <GlowButton
            type="button"
            variant="secondary"
            className="!px-3 !py-2 lg:hidden"
            aria-label="Open navigation"
            onClick={onMenuClick}
          >
            <Menu className="h-4 w-4" />
          </GlowButton>
        ) : null}
        {showBack ? (
          <Link to="/" className="mt-0.5">
            <GlowButton variant="secondary" className="!px-3 !py-2" aria-label="Back to LunaVoice home">
              <ArrowLeft className="h-4 w-4" />
            </GlowButton>
          </Link>
        ) : null}
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white light:text-slate-900">{title}</h1>
          {subtitle ? <p className="text-sm text-slate-400 light:text-slate-600">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:min-w-[280px] sm:items-end">
        {planSlot}
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
