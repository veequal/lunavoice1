import { motion } from 'framer-motion'
import { AppleLogo, GoogleLogo } from './ProviderLogos.jsx'

/** @typedef {'google' | 'apple'} Provider */

/** @param {{ disabled?: boolean, busyProvider?: Provider | null, onGoogle: () => void, onApple: () => void }} props */
export function SocialAuthButtons({ disabled, busyProvider, onGoogle, onApple }) {
  const items = [
    {
      id: /** @type {const} */ ('google'),
      label: 'Continue with Google',
      onClick: onGoogle,
      icon: <GoogleLogo className="h-[22px] w-[22px]" />,
      className:
        'border-white/10 bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/[0.11] hover:shadow-[0_0_42px_-10px_rgba(66,133,244,0.35),0_0_46px_-12px_rgba(45,212,191,0.35)] light:border-slate-200 light:bg-white light:text-slate-900 light:hover:bg-slate-50',
      iconWrap:
        'border-white/10 bg-white/90 shadow-[0_0_24px_-10px_rgba(66,133,244,0.45)] light:border-slate-200 light:bg-white',
    },
    {
      id: /** @type {const} */ ('apple'),
      label: 'Continue with Apple',
      onClick: onApple,
      icon: <AppleLogo className="h-[22px] w-[18px] text-white light:text-slate-900" />,
      className:
        'border-white/10 bg-slate-950/40 text-white hover:border-white/25 hover:bg-slate-950/55 hover:shadow-[0_0_42px_-10px_rgba(255,255,255,0.18),0_0_46px_-12px_rgba(167,139,250,0.35)] light:border-slate-200 light:bg-slate-900 light:text-white light:hover:bg-slate-800',
      iconWrap:
        'border-white/10 bg-white/10 shadow-[0_0_26px_-10px_rgba(255,255,255,0.22)] light:border-slate-200 light:bg-slate-100',
    },
  ]

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const busy = busyProvider === item.id
        return (
          <motion.button
            key={item.id}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            disabled={disabled || !!busyProvider}
            onClick={item.onClick}
            className={`group flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium backdrop-blur-xl transition disabled:cursor-not-allowed disabled:opacity-60 ${item.className}`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition group-hover:border-white/25 ${item.iconWrap}`}
            >
              {item.icon}
            </span>
            <span className="min-w-0 flex-1 text-left">{item.label}</span>
            {busy ? (
              <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-indigo-300 light:border-slate-300 light:border-t-indigo-600" />
              </span>
            ) : null}
          </motion.button>
        )
      })}
    </div>
  )
}
