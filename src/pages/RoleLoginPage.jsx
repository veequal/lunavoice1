import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { LunaVoiceLogo } from '../components/brand/LunaVoiceLogo.jsx'
import { ThemeToggle } from '../components/layout/ThemeToggle.jsx'
import { GlowButton } from '../components/ui/GlowButton.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { AuthModeTabs } from '../components/auth/AuthModeTabs.jsx'
import { SocialAuthButtons } from '../components/auth/SocialAuthButtons.jsx'
import { SignInForm } from '../components/auth/SignInForm.jsx'
import { SignUpForm } from '../components/auth/SignUpForm.jsx'
import { DemoModal } from '../components/auth/DemoModal.jsx'
import { GoogleAccountPickerModal } from '../components/auth/GoogleAccountPickerModal.jsx'
import { AppleSignInModal } from '../components/auth/AppleSignInModal.jsx'
import { AuthVerifyingOverlay } from '../components/auth/AuthVerifyingOverlay.jsx'
import { mockGoogleSignIn } from '../services/googleAuth.js'
import { mockAppleSignIn } from '../services/appleAuth.js'

const ROLE_CONFIG = {
  parent: {
    title: 'Parent Portal',
    subtitle: 'Track your child’s progress, sessions, and care team messages.',
    dashboard: '/parent-dashboard',
    accent: 'from-teal-400/20 via-cyan-400/10 to-indigo-500/15',
    ring: 'ring-teal-400/25',
  },
  doctor: {
    title: 'Doctor / Therapist Portal',
    subtitle: 'Clinical analytics, AI summaries, and session workflows.',
    dashboard: '/doctor-dashboard',
    accent: 'from-indigo-400/25 via-violet-400/15 to-fuchsia-500/10',
    ring: 'ring-indigo-400/30',
  },
  child: {
    title: 'Child Portal',
    subtitle: 'A calm, playful space for speech practice and rewards.',
    dashboard: '/child-dashboard',
    accent: 'from-amber-400/20 via-fuchsia-400/10 to-violet-500/15',
    ring: 'ring-amber-400/25',
  },
}

/** @typedef {'google' | 'apple' | null} ProviderModal */

export default function RoleLoginPage() {
  const { role } = useParams()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const cfg = ROLE_CONFIG[role]

  const [mode, setMode] = useState(/** @type {'signin' | 'signup'} */ ('signin'))
  const [forgotOpen, setForgotOpen] = useState(false)
  const [providerModal, setProviderModal] = useState(/** @type {ProviderModal} */ (null))
  const [verifying, setVerifying] = useState(false)
  const [verifyProvider, setVerifyProvider] = useState(/** @type {'google' | 'apple' | null} */ (null))
  const [verifyAccountName, setVerifyAccountName] = useState('')
  const [verifyMessage, setVerifyMessage] = useState('Authenticating securely…')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const authTimersRef = useRef({ step: null, done: null, nav: null })
  const busyRef = useRef(false)

  useEffect(() => {
    return () => {
      busyRef.current = false
      const { step, done, nav } = authTimersRef.current
      if (step) window.clearInterval(step)
      if (done) window.clearTimeout(done)
      if (nav) window.clearTimeout(nav)
    }
  }, [])

  useEffect(() => {
    document.title = cfg ? `LunaVoice · ${cfg.title}` : 'LunaVoice'
  }, [cfg])

  const invalid = !cfg
  const portalRole = role

  const finishAuth = useCallback(
    (targetPath) => {
      if (!cfg || busyRef.current) return
      busyRef.current = true
      setVerifying(false)
      setLoading(true)
      setProgress(0)
      setVerifyMessage('Connecting to LunaVoice')

      const step = window.setInterval(() => {
        setProgress((p) => Math.min(100, p + 14))
      }, 160)

      const done = window.setTimeout(() => {
        window.clearInterval(step)
        authTimersRef.current.step = null
        setProgress(100)
        const nav = window.setTimeout(() => {
          navigate(targetPath, { replace: true })
        }, 200)
        authTimersRef.current.nav = nav
      }, 900)

      authTimersRef.current = { step, done, nav: null }
    },
    [cfg, navigate],
  )

  const handleProviderSelect = useCallback(
    async (provider, accountId) => {
      if (!cfg || busyRef.current) return
      setProviderModal(null)
      setVerifyProvider(provider)
      setVerifyMessage(provider === 'google' ? 'Verifying with Google…' : 'Verifying with Apple…')
      setVerifying(true)

      const result =
        provider === 'google' ? await mockGoogleSignIn(accountId) : await mockAppleSignIn(accountId)

      if (!result.ok || !result.account) {
        setVerifying(false)
        busyRef.current = false
        return
      }

      setVerifyAccountName(result.account.name)
      setVerifyMessage('Authenticating securely…')

      await new Promise((r) => window.setTimeout(r, 600))

      finishAuth(cfg.dashboard)
    },
    [cfg, role, finishAuth],
  )

  const onGoogle = () => {
    if (!cfg || busyRef.current) return
    setProviderModal('google')
  }

  const onApple = () => {
    if (!cfg || busyRef.current) return
    setProviderModal('apple')
  }

  const cardMotion = {
    initial: reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }

  if (invalid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 light:bg-slate-50">
        <p className="text-sm text-slate-300 light:text-slate-700">This portal link is not valid.</p>
        <Link to="/" className="mt-4 text-sm font-medium text-indigo-300 hover:text-indigo-200 light:text-indigo-700">
          Back to LunaVoice
        </Link>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 light:bg-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-mesh-gradient" />
      <div className="pointer-events-none fixed -left-32 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 bottom-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-3xl" />

      <header className="mx-auto flex max-w-lg items-center justify-between px-4 pb-2 pt-8 sm:px-6 sm:pt-10">
        <Link to="/" aria-label="Back to home">
          <GlowButton variant="secondary" className="!gap-2 !px-3 !py-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </GlowButton>
        </Link>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col items-center justify-center px-4 pb-16 pt-4 sm:px-6">
        <motion.div {...cardMotion} className="mb-8 w-full">
          <div className="flex justify-center">
            <LunaVoiceLogo size="md" />
          </div>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/80 light:text-indigo-700">
            Secure demo sign-in
          </p>
          <h1 className="mt-2 text-center text-2xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-3xl">
            {cfg.title}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-slate-400 light:text-slate-600">
            {cfg.subtitle}
          </p>
        </motion.div>

        <motion.div
          {...cardMotion}
          transition={{ ...cardMotion.transition, delay: reduced ? 0 : 0.06 }}
          className={`relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/50 p-6 shadow-glow backdrop-blur-2xl ring-1 ring-white/5 light:border-slate-200/80 light:bg-white/75 light:ring-slate-200/60 sm:p-8 ${cfg.ring}`}
        >
          <div className={`pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br opacity-70 ${cfg.accent}`} />
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-violet-500/20 opacity-60 blur-sm" />

          <AuthModeTabs mode={mode} onChange={setMode} disabled={loading || verifying} />

          <div className="relative mt-6 space-y-6">
            <SocialAuthButtons
              disabled={loading || verifying}
              busyProvider={null}
              onGoogle={onGoogle}
              onApple={onApple}
            />

            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent light:via-slate-300/40" />
              <span className="relative mx-auto block w-fit bg-slate-950/70 px-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 light:bg-white/90">
                or continue with email
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {mode === 'signin' ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SignInForm
                    disabled={loading || verifying}
                    onForgotPassword={() => setForgotOpen(true)}
                    onAuthenticated={() => finishAuth(cfg.dashboard)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SignUpForm disabled={loading || verifying} onAuthenticated={() => finishAuth(cfg.dashboard)} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 light:border-slate-200 light:bg-slate-50">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400 light:text-slate-600">
                      <span>Connecting to LunaVoice</span>
                      <span className="font-mono tabular-nums">{progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.25 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <p className="relative mt-6 text-center text-[11px] leading-relaxed text-slate-500 light:text-slate-500">
            Mock OAuth — account pickers simulate Google & Apple. Email sign-in uses demo credentials only.
          </p>
        </motion.div>
      </div>

      <GoogleAccountPickerModal
        open={providerModal === 'google'}
        portalRole={portalRole}
        onClose={() => setProviderModal(null)}
        onSelect={(id) => handleProviderSelect('google', id)}
      />

      <AppleSignInModal
        open={providerModal === 'apple'}
        portalRole={portalRole}
        onClose={() => setProviderModal(null)}
        onSelect={(id) => handleProviderSelect('apple', id)}
      />

      <AuthVerifyingOverlay
        open={verifying}
        provider={verifyProvider}
        accountName={verifyAccountName}
        message={verifyMessage}
        submessage="Connecting to LunaVoice"
      />

      <DemoModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Password recovery (demo)"
        description="LunaVoice is running in simulated mode. Password reset emails are not connected — use any valid-looking credentials to explore the product."
      />
    </div>
  )
}
