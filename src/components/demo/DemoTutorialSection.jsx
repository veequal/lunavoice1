import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayCircle, Sparkles } from 'lucide-react'
import { DEMO_SECTION } from '../../mock/demoWalkthrough.js'
import { DemoVideoPlayer } from './DemoVideoPlayer.jsx'
import { GlowButton } from '../ui/GlowButton.jsx'
import { UpgradeCtaButton } from '../pricing/UpgradeCtaButton.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

/** @param {{ onViewPricing?: () => void }} props */
export function DemoTutorialSection({ onViewPricing }) {
  const reduced = useReducedMotion()

  const scrollToPlayer = useCallback(() => {
    const el = document.getElementById('demo-player')
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.dispatchEvent(new CustomEvent('lunavoice-demo-play'))
  }, [])

  return (
    <section id="demo" className="scroll-mt-24 border-t border-white/10 py-14 light:border-slate-200 sm:py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-3 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200/90 light:text-indigo-700">
            {DEMO_SECTION.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-4xl">
            {DEMO_SECTION.title}
          </h2>
          <p className="mt-2 text-lg font-medium text-slate-200 light:text-slate-800">{DEMO_SECTION.headline}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-400 light:text-slate-600">{DEMO_SECTION.subtitle}</p>

          <ul className="mt-6 space-y-2.5 text-sm text-slate-300 light:text-slate-700">
            {[
              'Parent & therapist portals with live progress',
              'Child-friendly practice with AI pronunciation scoring',
              'Appointments, secure records, and AI session summaries',
            ].map((line) => (
              <li key={line} className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal-300 light:text-teal-600" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <GlowButton type="button" onClick={scrollToPlayer} className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Watch walkthrough
            </GlowButton>
            <Link to="/login/parent">
              <GlowButton variant="secondary" type="button">
                Try parent portal
              </GlowButton>
            </Link>
            {onViewPricing ? <UpgradeCtaButton onClick={onViewPricing} /> : null}
          </div>
        </motion.div>

        <motion.div
          id="demo-player"
          initial={reduced ? undefined : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <DemoVideoPlayer />
          <p className="mt-3 text-center text-[11px] text-slate-500 light:text-slate-500">
            Simulated product walkthrough · auto-plays on load · no audio required
          </p>
        </motion.div>
      </div>
    </section>
  )
}
