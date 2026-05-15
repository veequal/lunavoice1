import { AnimatePresence, motion } from 'framer-motion'
import { ScanFace, X } from 'lucide-react'
import { getAppleAccountsForPortal } from '../../mock/authProviders.js'
import { AppleLogo } from './ProviderLogos.jsx'
import { AccountAvatar } from './AccountAvatar.jsx'

/** @param {{ open: boolean, portalRole: 'parent' | 'doctor' | 'child', onClose: () => void, onSelect: (accountId: string) => void }} props */
export function AppleSignInModal({ open, portalRole, onClose, onSelect }) {
  const accounts = getAppleAccountsForPortal(portalRole)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" aria-label="Close" className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="relative w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#1c1c1e] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pb-2 pt-8 text-center">
              <AppleLogo className="mx-auto h-9 w-9 text-white" />
              <h2 className="mt-5 text-lg font-semibold tracking-tight">Sign in with Apple</h2>
              <p className="mt-1 text-sm text-slate-400">Use your Apple Account for LunaVoice</p>
            </div>

            <motion.div
              className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5"
              animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ScanFace className="h-10 w-10 text-white/90" />
            </motion.div>
            <p className="text-center text-xs text-slate-500">Face ID · Simulated secure check</p>

            <motion.div className="mt-5 space-y-0.5 border-t border-white/10 px-2 py-2">
              {accounts.map((acc, i) => (
                <motion.button
                  key={acc.id}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  onClick={() => onSelect(acc.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                >
                  <AccountAvatar initials={acc.avatar} colorClass={acc.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{acc.name}</p>
                    <p className="truncate text-xs text-slate-400">{acc.email}</p>
                  </div>
                  {acc.recent ? (
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">Recent</span>
                  ) : null}
                </motion.button>
              ))}
            </motion.div>

            <p className="px-6 py-4 text-center text-[10px] leading-relaxed text-slate-500">
              Your name and email may be shared with LunaVoice. Demo only — no Apple servers contacted.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
