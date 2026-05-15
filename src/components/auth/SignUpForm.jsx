import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { allRulesMet, checkPasswordRules, looksLikeEmail } from '../../lib/password.js'
import { GlowButton } from '../ui/GlowButton.jsx'
import { PasswordField } from './PasswordField.jsx'

/** @param {{ disabled?: boolean, onAuthenticated: () => void }} props */
export function SignUpForm({ disabled, onAuthenticated }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirm: false })
  const [submitCount, setSubmitCount] = useState(0)

  const pwdChecks = useMemo(() => checkPasswordRules(password), [password])
  const pwdValid = allRulesMet(pwdChecks, password)

  const nameError = useMemo(() => {
    if (!touched.name && submitCount === 0) return null
    if (!fullName.trim()) return 'Full name is required'
    return null
  }, [fullName, touched.name, submitCount])

  const emailError = useMemo(() => {
    if (!touched.email && submitCount === 0) return null
    if (!email.trim()) return 'Email is required'
    if (!looksLikeEmail(email)) return 'Enter a valid email address'
    return null
  }, [email, touched.email, submitCount])

  const passwordError = useMemo(() => {
    if (!touched.password && submitCount === 0) return null
    if (!password) return 'Password is required'
    if (password.length > 30) return 'Password must be 30 characters or fewer'
    if (!allRulesMet(pwdChecks, password)) return 'Password does not meet security requirements'
    return null
  }, [password, pwdChecks, touched.password, submitCount])

  const confirmError = useMemo(() => {
    if (!touched.confirm && submitCount === 0) return null
    if (!confirm) return 'Confirm your password'
    if (confirm !== password) return 'Passwords do not match'
    return null
  }, [confirm, password, touched.confirm, submitCount])

  const nameOk = fullName.trim().length > 0
  const emailOk = looksLikeEmail(email)
  const confirmOk = confirm.length > 0 && confirm === password && pwdValid

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitCount((c) => c + 1)
        setTouched({ name: true, email: true, password: true, confirm: true })
        if (!fullName.trim() || !looksLikeEmail(email) || !pwdValid || confirm !== password) return
        onAuthenticated()
      }}
    >
      <div className="space-y-2">
        <label htmlFor="lv-signup-name" className="text-xs font-medium text-slate-300 light:text-slate-700">
          Full name
        </label>
        <motion.input
          id="lv-signup-name"
          type="text"
          autoComplete="name"
          disabled={disabled}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          animate={submitCount > 0 && nameError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none ring-2 ring-transparent transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 light:bg-white light:text-slate-900 ${
            nameError
              ? 'border-rose-400/50'
              : nameOk
                ? 'border-emerald-400/45 shadow-[0_0_26px_-12px_rgba(52,211,153,0.45)]'
                : 'border-white/10 light:border-slate-200'
          }`}
          placeholder="Jordan Lee"
        />
        <AnimatePresence initial={false} mode="wait">
          {nameError ? (
            <motion.p
              key="name-err"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs font-medium text-rose-200 light:text-rose-700"
            >
              {nameError}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <label htmlFor="lv-signup-email" className="text-xs font-medium text-slate-300 light:text-slate-700">
          Email
        </label>
        <motion.input
          id="lv-signup-email"
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
          autoComplete="new-password"
          error={passwordError}
          success={pwdValid && !passwordError}
          showMeter
          onBlurField={() => setTouched((t) => ({ ...t, password: true }))}
        />
      </motion.div>

      <motion.div
        animate={submitCount > 0 && confirmError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <PasswordField
          label="Confirm password"
          value={confirm}
          onChange={setConfirm}
          disabled={disabled}
          autoComplete="new-password"
          error={confirmError}
          success={confirmOk && !confirmError}
          onBlurField={() => setTouched((t) => ({ ...t, confirm: true }))}
        />
      </motion.div>

      <GlowButton type="submit" className="w-full !py-3 text-base" disabled={disabled}>
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white light:border-slate-300 light:border-t-indigo-600" />
            Creating your workspace…
          </span>
        ) : (
          'Create LunaVoice account'
        )}
      </GlowButton>
    </form>
  )
}
