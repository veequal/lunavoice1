import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { getGoogleAccountsForPortal } from '../../mock/authProviders.js'
import { GoogleLogo } from './ProviderLogos.jsx'
import { AccountAvatar } from './AccountAvatar.jsx'

/** @param {{ open: boolean, portalRole: 'parent' | 'doctor' | 'child', onClose: () => void, onSelect: (accountId: string) => void }} props */
export function GoogleAccountPickerModal({ open, portalRole, onClose, onSelect }) {
  const accounts = getGoogleAccountsForPortal(portalRole)
  const recent = accounts.filter((a) => a.recent)
  const others = accounts.filter((a) => !a.recent)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" aria-label="Close" className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="google-picker-title"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl light:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div className="border-b border-slate-200 px-6 pb-4 pt-6 text-center">
              <GoogleLogo className="mx-auto h-8 w-8" />
              <h2 id="google-picker-title" className="mt-4 text-base font-normal text-slate-800">
                Choose an account
              </h2>
              <p className="mt-1 text-sm text-slate-500">to continue to LunaVoice</p>
            </motion.div>

            <div className="max-h-[320px] overflow-y-auto py-1">
              {recent.length ? (
                <>
                  <p className="px-6 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">Recently used</p>
                  {recent.map((acc, i) => (
                    <AccountRow key={acc.id} account={acc} index={i} onSelect={onSelect} />
                  ))}
                </>
              ) : null}
              {others.length ? (
                <>
                  {recent.length ? (
                    <p className="px-6 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">Other accounts</p>
                  ) : null}
                  {others.map((acc, i) => (
                    <AccountRow key={acc.id} account={acc} index={i + recent.length} onSelect={onSelect} />
                  ))}
                </>
              ) : null}
            </div>

            <button
              type="button"
              className="flex w-full items-center gap-4 border-t border-slate-200 px-6 py-4 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              onClick={onClose}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                +
              </span>
              <span>Use another account</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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

/** @param {{ account: import('../../mock/authProviders.js').MockAuthAccount, index: number, onSelect: (id: string) => void }} props */
function AccountRow({ account, index, onSelect }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onSelect(account.id)}
      className="flex w-full items-center gap-4 px-6 py-3 text-left transition hover:bg-slate-50"
    >
      <AccountAvatar initials={account.avatar} colorClass={account.avatarColor} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{account.name}</p>
        <p className="truncate text-xs text-slate-500">{account.email}</p>
      </div>
    </motion.button>
  )
}
