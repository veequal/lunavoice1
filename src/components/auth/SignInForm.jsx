import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { looksLikeEmail } from '../../lib/password.js'
import { GlowButton } from '../ui/GlowButton.jsx'
import { PasswordField } from './PasswordField.jsx'

/** @param {{ disabled?: boolean, onAuthenticated: (opts: { remember: boolean }) => void, onForgotPassword: () => void }} props */
export function SignInForm({ disabled, onAuthenticated, onForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => localStorage.getItem('lunavoice_demo_remember') === '1')
  const [touched, setTouched] = useState({ email: false, password: false })
  const [submitCount, setSubmitCount] = useState(0)

  const emailError = useMemo(() => {
    if (!touched.email && submitCount === 0) return null
    if (!email.trim()) return 'Email is required'
    if (!looksLikeEmail(email)) return 'Enter a valid email address'
    return null
  }, [email, touched.email, submitCount])

  const passwordError = useMemo(() => {
    if (!touched.password && submitCount === 0) return null
    if (!password) return 'Password is required'
    return null
  }, [password, touched.password, submitCount])

  const emailOk = looksLikeEmail(email)
  const passwordOk = password.length > 0

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitCount((c) => c + 1)
        setTouched({ email: true, password: true })
        if (!looksLikeEmail(email) || !password) return
        onAuthenticated({ remember })
      }}
    >
      <div className="space-y-2">
        <label htmlFor="lv-signin-email" className="text-xs font-medium text-slate-300 light:text-slate-700">
          Email
        </label>
        <motion.input
          id="lv-signin-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          disabled={disabled}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          animate={submitCount > 0 && emailError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none ring-2 ring-transparent transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 light:bg-white light:text-slate-900 ${
            emailError
              ? 'border-rose-400/50'
              : emailOk && email
                ? 'border-emerald-400/45 shadow-[0_0_26px_-12px_rgba(52,211,153,0.45)]'
                : 'border-white/10 light:border-slate-200'
          }`}
          placeholder="you@healthsystem.org"
        />
        <AnimatePresence initial={false} mode="wait">
          {emailError ? (
            <motion.p
              key="email-err"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs font-medium text-rose-200 light:text-rose-700"
            >
              {emailError}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <motion.div
        animate={submitCount > 0 && passwordError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          disabled={disabled}
          autoComplete="current-password"
          error={passwordError}
          success={passwordOk && !passwordError}
          onBlurField={() => setTouched((t) => ({ ...t, password: true }))}
        />
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-slate-300 light:text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-500/40 light:border-slate-300"
            checked={remember}
            disabled={disabled}
            onChange={(e) => {
              const v = e.target.checked
              setRemember(v)
              if (v) localStorage.setItem('lunavoice_demo_remember', '1')
              else localStorage.removeItem('lunavoice_demo_remember')
            }}
          />
          Remember me
        </label>
        <button
          type="button"
          className="text-indigo-200/90 underline-offset-4 hover:text-white hover:underline disabled:cursor-not-allowed disabled:opacity-50 light:text-indigo-700 light:hover:text-indigo-900"
          disabled={disabled}
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>
      </div>

      <GlowButton type="submit" className="w-full !py-3 text-base" disabled={disabled}>
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white light:border-slate-300 light:border-t-indigo-600" />
            Signing in…
          </span>
        ) : (
          'Sign in to LunaVoice'
        )}
      </GlowButton>
    </form>
  )
}
