import { motion } from 'framer-motion'
import { LunaVoiceLogo } from '../brand/LunaVoiceLogo.jsx'
import { ThemeToggle } from '../layout/ThemeToggle.jsx'
import { UpgradeCtaButton } from './UpgradeCtaButton.jsx'

/** @param {{ onViewPricing: () => void, onViewDemo?: () => void }} props */
export function LandingNavbar({ onViewPricing, onViewDemo }) {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl light:border-slate-200/80 light:bg-white/70"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
        initial={false}
      >
        <LunaVoiceLogo size="sm" />
        <div className="flex items-center gap-2 sm:gap-3">
          {onViewDemo ? (
            <button
              type="button"
              onClick={onViewDemo}
              className="hidden text-sm font-medium text-slate-300 transition hover:text-white md:inline light:text-slate-600 light:hover:text-slate-900"
            >
              Demo
            </button>
          ) : null}
          <UpgradeCtaButton onClick={onViewPricing} className="hidden sm:inline-flex" />
          <UpgradeCtaButton onClick={onViewPricing} compact className="inline-flex sm:hidden" />
          <ThemeToggle />
        </div>
      </motion.div>
    </motion.header>
  )
}
