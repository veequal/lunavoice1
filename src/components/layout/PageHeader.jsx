import { Link } from 'react-router-dom'
import { ArrowLeft, Menu } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'

/** @param {{ title: string, subtitle?: string, showBack?: boolean, onMenuClick?: () => void, showMenuTrigger?: boolean, planSlot?: import('react').ReactNode }} props */
export function PageHeader({ title, subtitle, showBack = true, onMenuClick, showMenuTrigger, planSlot }) {
  return (
    <header className="flex flex-col gap-3 border-b border-white/10 bg-slate-950/40 px-3 py-3 backdrop-blur-xl light:border-slate-200 light:bg-white/70 sm:gap-4 sm:px-4 sm:py-4 md:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <div className="flex min-w-0 items-start gap-2 sm:gap-3">
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
          <Link to="/" className="mt-0.5 shrink-0">
            <GlowButton variant="secondary" className="!px-3 !py-2" aria-label="Back to LunaVoice home">
              <ArrowLeft className="h-4 w-4" />
            </GlowButton>
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-semibold leading-snug tracking-tight text-white light:text-slate-900 sm:text-lg md:text-xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 line-clamp-2 text-xs text-slate-400 light:text-slate-600 sm:text-sm">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:justify-end sm:gap-3 lg:flex-col lg:items-stretch xl:max-w-xl xl:items-end">
        {planSlot ? <div className="min-w-0 w-full flex-1">{planSlot}</div> : null}
        <div className="flex shrink-0 justify-end sm:pt-0.5">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

