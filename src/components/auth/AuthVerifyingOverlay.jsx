import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Shield } from 'lucide-react'
import { AppleLogo, GoogleLogo } from './ProviderLogos.jsx'

/** @param {{ open: boolean, provider?: 'google' | 'apple' | null, accountName?: string, message?: string, submessage?: string, progress?: number }} props */
export function AuthVerifyingOverlay({
  open,
  provider,
  accountName,
  message = 'Authenticating securely…',
  submessage = 'Connecting to LunaVoice',
  progress,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/65 backdrop-blur-xl light:bg-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="mx-4 w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-glow backdrop-blur-2xl light:border-slate-200 light:bg-white"
          >
            <div className="flex justify-center">
              {provider === 'google' ? (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="rounded-2xl border border-white/10 bg-white p-3 light:border-slate-200"
                >
                  <GoogleLogo className="h-8 w-8" />
                </motion.div>
              ) : provider === 'apple' ? (
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white"
                  animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0.2)', '0 0 24px 4px rgba(255,255,255,0.15)', '0 0 0 0 rgba(255,255,255,0.2)'] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <AppleLogo className="h-7 w-6" />
                </motion.div>
              ) : (
                <Shield className="h-10 w-10 text-indigo-300 light:text-indigo-600" />
              )}
            </div>

            <p className="mt-6 text-center text-sm font-semibold text-white light:text-slate-900">{message}</p>
            <p className="mt-1 text-center text-xs text-slate-400 light:text-slate-600">{submessage}</p>
            {accountName ? (
              <p className="mt-2 text-center text-xs font-medium text-indigo-200 light:text-indigo-700">{accountName}</p>
            ) : null}

            <div className="mt-6 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-300 light:text-indigo-600" />
            </div>

            {typeof progress === 'number' ? (
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : null}

            <p className="mt-4 text-center text-[10px] text-slate-500">Simulated verification · HIPAA-ready session (demo)</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
