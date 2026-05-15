import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { checkPasswordRules, getPasswordStrength } from '../../lib/password.js'

const strengthCopy = {
  weak: { label: 'Weak', bar: 'from-rose-400/80 to-amber-400/70' },
  medium: { label: 'Medium', bar: 'from-amber-300/80 to-sky-400/80' },
  strong: { label: 'Strong', bar: 'from-emerald-400/90 to-cyan-300/80' },
}

/** @param {{ id?: string, label: string, value: string, onChange: (v: string) => void, disabled?: boolean, autoComplete?: string, error?: string | null, success?: boolean, showMeter?: boolean, maxLength?: number, onBlurField?: () => void }} props */
export function PasswordField({
  id,
  label,
  value,
  onChange,
  disabled,
  autoComplete = 'new-password',
  error,
  success,
  showMeter,
  maxLength = 30,
  onBlurField,
}) {
  const autoId = useId()
  const fieldId = id ?? `pwd-${autoId}`
  const [visible, setVisible] = useState(false)

  const strength = useMemo(() => getPasswordStrength(value), [value])
  const checks = useMemo(() => checkPasswordRules(value), [value])

  const meterPct =
    strength === 'empty' ? 0 : strength === 'weak' ? 33 : strength === 'medium' ? 66 : 100

  const borderClass = error
    ? 'border-rose-400/50 shadow-[0_0_0_1px_rgba(251,113,133,0.35)]'
    : success
      ? 'border-emerald-400/45 shadow-[0_0_24px_-10px_rgba(52,211,153,0.45)]'
      : 'border-white/10 focus-within:border-indigo-400/40 focus-within:shadow-glow-sm light:border-slate-200 light:focus-within:border-indigo-500/40'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={fieldId} className="text-xs font-medium text-slate-300 light:text-slate-700">
          {label}
        </label>
        {showMeter && value ? (
          <motion.span
            key={strength}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs font-semibold ${
              strength === 'weak'
                ? 'text-rose-200 light:text-rose-700'
                : strength === 'medium'
                  ? 'text-amber-200 light:text-amber-700'
                  : 'text-emerald-200 light:text-emerald-700'
            }`}
          >
            {strength === 'empty' ? '' : strengthCopy[strength].label}
          </motion.span>
        ) : null}
      </div>

      <div
        className={`relative flex items-center rounded-xl border bg-white/5 px-3 backdrop-blur-xl transition light:bg-white ${borderClass}`}
      >
        <input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlurField}
          className="w-full bg-transparent py-3 pr-11 text-sm text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 light:text-slate-900"
          placeholder="••••••••"
        />
        <button
          type="button"
          className="absolute right-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 light:border-slate-200 light:bg-slate-50 light:text-slate-700"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {showMeter ? (
        <div className="space-y-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${
                strength === 'empty' ? 'from-transparent to-transparent' : strengthCopy[strength].bar
              }`}
              initial={false}
              animate={{ width: `${meterPct}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            />
          </div>
          <ul className="grid gap-1 text-[11px] text-slate-400 light:text-slate-600 sm:grid-cols-2">
            <Rule ok={value.length > 0 && value.length <= 30} text="30 characters max" />
            <Rule ok={checks.upper} text="At least 1 uppercase letter" />
            <Rule ok={checks.number} text="At least 1 number" />
            <Rule ok={checks.special} text="At least 1 special character" />
          </ul>
        </div>
      ) : null}

      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="err"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-xs font-medium text-rose-200 light:text-rose-700"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/** @param {{ ok: boolean, text: string }} props */
function Rule({ ok, text }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
          ok
            ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200 light:border-emerald-300 light:bg-emerald-50 light:text-emerald-800'
            : 'border-white/10 bg-white/5 text-slate-500 light:border-slate-200 light:bg-slate-100'
        }`}
        aria-hidden
      >
        {ok ? '✓' : ''}
      </span>
      <span className={ok ? 'text-slate-200 light:text-slate-800' : undefined}>{text}</span>
    </li>
  )
}
