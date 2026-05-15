import { motion } from 'framer-motion'

/** @typedef {'signin' | 'signup'} AuthMode */

/** @param {{ mode: AuthMode, onChange: (m: AuthMode) => void, disabled?: boolean }} props */
export function AuthModeTabs({ mode, onChange, disabled }) {
  return (
    <div
      role="tablist"
      aria-label="Authentication mode"
      className="relative flex rounded-2xl border border-white/10 bg-slate-950/40 p-1 light:border-slate-200 light:bg-slate-900/5"
    >
      <motion.div
        layout
        className="absolute inset-y-1 rounded-xl bg-gradient-to-r from-indigo-500/25 via-violet-500/15 to-cyan-400/15 shadow-glow-sm ring-1 ring-indigo-400/25 light:from-indigo-200/60 light:via-violet-100/50 light:to-cyan-100/40 light:ring-indigo-300/40"
        style={{
          width: 'calc(50% - 4px)',
          left: mode === 'signin' ? 4 : 'calc(50%)',
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      />
      {[
        { id: /** @type {const} */ ('signin'), label: 'Sign In' },
        { id: /** @type {const} */ ('signup'), label: 'Create Account' },
      ].map((tab) => {
        const active = mode === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled}
            onClick={() => onChange(tab.id)}
            className="relative z-10 flex-1 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400/70 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className={
                active
                  ? 'text-white drop-shadow-sm light:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
              }
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
