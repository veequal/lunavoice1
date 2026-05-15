import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Baby, ChevronRight, ShieldCheck, Stethoscope } from 'lucide-react'
import { LunaVoiceLogo } from '../components/brand/LunaVoiceLogo.jsx'
import { LandingNavbar } from '../components/pricing/LandingNavbar.jsx'
import { DemoTutorialSection } from '../components/demo/DemoTutorialSection.jsx'
import { PricingSection } from '../components/pricing/PricingSection.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const portals = [
  {
    id: 'parent',
    label: 'Parent Portal',
    description: 'Progress, appointments, and therapist messages.',
    to: '/login/parent',
    icon: ShieldCheck,
    accent: 'group-hover:border-teal-400/35 group-hover:shadow-[0_0_32px_-8px_rgba(45,212,191,0.35)]',
  },
  {
    id: 'doctor',
    label: 'Doctor / Therapist Portal',
    description: 'Analytics, AI summaries, and session operations.',
    to: '/login/doctor',
    icon: Stethoscope,
    accent: 'group-hover:border-indigo-400/40 group-hover:shadow-glow-sm',
  },
  {
    id: 'child',
    label: 'Child Portal',
    description: 'Playful practice, rewards, and gentle guidance.',
    to: '/login/child',
    icon: Baby,
    accent: 'group-hover:border-amber-400/35 group-hover:shadow-[0_0_32px_-8px_rgba(251,191,36,0.25)]',
  },
]

export default function LoginPage() {
  const reduced = useReducedMotion()

  const scrollToPricing = useCallback(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const scrollToDemo = useCallback(() => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    document.title = 'LunaVoice · Pediatric speech intelligence'
    if (window.location.hash === '#pricing') {
      window.requestAnimationFrame(() => scrollToPricing())
    }
  }, [scrollToPricing])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 light:bg-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-mesh-gradient" />
      <motion.div
        className="pointer-events-none fixed -left-24 top-10 -z-10 h-96 w-96 rounded-full bg-indigo-600/28 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none fixed -right-28 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/22 blur-3xl" />

      <LandingNavbar onViewPricing={scrollToPricing} onViewDemo={scrollToDemo} />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col px-3 pb-8 pt-8 sm:px-6 sm:pt-14">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mx-auto w-full max-w-3xl text-center">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200/90 light:text-indigo-700"
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              LunaVoice
            </motion.p>
            <motion.h1
              className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.1]"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              The AI-native platform for pediatric speech therapy teams and families.
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 light:text-slate-600 sm:text-lg"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              LunaVoice unifies session intelligence, caregiver communication, and child-friendly practice — with the security
              posture expected in modern healthcare SaaS.
            </motion.p>
          </div>

          <motion.div
            className="mt-14 w-full max-w-xl space-y-3 sm:mt-16"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500 light:text-slate-500">
              Choose a portal to continue
            </p>
            {portals.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.id}
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.18 + i * 0.06 }}
                >
                  <Link
                    to={p.to}
                    className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3.5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] sm:gap-4 sm:px-5 sm:py-4 light:border-slate-200/90 light:bg-white/80 light:hover:bg-white ${p.accent}`}
                  >
                    <motion.div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/25 to-violet-500/15 text-indigo-100 light:border-slate-200 light:from-indigo-100 light:to-violet-100 light:text-indigo-700">
                      <Icon className="h-6 w-6" aria-hidden />
                    </motion.div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-base font-semibold text-white light:text-slate-900">{p.label}</p>
                      <p className="mt-0.5 text-sm text-slate-400 light:text-slate-600">{p.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-200 light:text-slate-400 light:group-hover:text-indigo-600" />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      <DemoTutorialSection onViewPricing={scrollToPricing} />

      <PricingSection />

      <footer className="border-t border-white/10 py-10 text-center light:border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <LunaVoiceLogo size="sm" className="mx-auto opacity-80" />
          <p className="mt-4 text-xs text-slate-500 light:text-slate-600">
            © {new Date().getFullYear()} LunaVoice — demo experience. No authentication, no PHI. Mirrors a production healthcare
            workflow.
          </p>
        </div>
      </footer>
    </div>
  )
}
