import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'

/** @param {{ open: boolean, title: string, description: string, onClose: () => void }} props */
export function DemoModal({ open, title, description, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm light:bg-slate-900/40"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-glow backdrop-blur-2xl light:border-slate-200 light:bg-white"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 light:border-slate-200 light:bg-slate-50 light:text-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="pr-10 text-lg font-semibold text-white light:text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 light:text-slate-600">{description}</p>
            <GlowButton type="button" className="mt-6 w-full" onClick={onClose}>
              Got it
            </GlowButton>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
