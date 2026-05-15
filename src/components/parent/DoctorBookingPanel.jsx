import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, Mail, Phone, Sparkles, Video, X } from 'lucide-react'
import { useMemo, useState } from 'react'

function SlotCard({ slot, selected, disabled, onSelect }) {
  return (
    <motion.button
      type="button"
      layout
      disabled={disabled}
      onClick={onSelect}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={[
        'flex w-full flex-col gap-2 rounded-2xl border px-4 py-3 text-left transition',
        selected
          ? 'border-teal-400/45 bg-gradient-to-br from-teal-500/20 via-cyan-400/10 to-transparent text-white shadow-[0_0_36px_-14px_rgba(45,212,191,0.35)] light:border-teal-300 light:from-teal-100 light:to-white light:text-slate-900'
          : 'border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/20 hover:bg-white/[0.05] light:border-slate-200 light:bg-white light:text-slate-800',
        disabled ? 'opacity-60' : '',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{slot.dayLabel}</p>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300 light:border-slate-200 light:bg-slate-100 light:text-slate-600">
          <Clock className="h-3 w-3 text-teal-300 light:text-teal-600" />
          {slot.timeLabel}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400 light:text-slate-600">
        <Video className="h-3.5 w-3.5 text-violet-200 light:text-violet-600" />
        <span>{slot.consultationType}</span>
      </div>
    </motion.button>
  )
}

/** @param {{ doctor: object | null, open: boolean, onClose: () => void, favorited: boolean, onToggleFavorite: () => void }} props */
export function DoctorBookingPanel({ doctor, open, onClose, favorited, onToggleFavorite }) {
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [phase, setPhase] = useState('pick')

  const selectedSlot = useMemo(
    () => doctor?.availableSlots?.find((s) => s.id === selectedSlotId) ?? null,
    [doctor, selectedSlotId],
  )

  const confirm = () => {
    if (!selectedSlot) return
    setPhase('loading')
    window.setTimeout(() => setPhase('success'), 1100)
  }

  return (
    <AnimatePresence>
      {open && doctor ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close booking"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md light:bg-slate-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative z-[81] flex max-h-[min(92dvh,880px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-slate-950/90 shadow-glass backdrop-blur-2xl light:border-slate-200 light:bg-white/95 sm:rounded-[28px]"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6 light:border-slate-200">
              <div className="flex min-w-0 gap-4">
                <div className="relative shrink-0">
                  <img
                    src={doctor.avatarUrl}
                    alt=""
                    className="h-16 w-16 rounded-2xl border border-white/10 object-cover shadow-[0_0_30px_-10px_rgba(45,212,191,0.45)] light:border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-teal-500/40 to-violet-500/30 text-white shadow-lg light:border-slate-200">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 light:text-slate-600">Book appointment</p>
                  <h2 id="booking-title" className="mt-1 text-lg font-semibold tracking-tight text-white light:text-slate-900 sm:text-xl">
                    {doctor.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{doctor.specialty}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={onToggleFavorite}
                  className={
                    favorited
                      ? 'rounded-2xl border border-rose-400/40 bg-rose-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-rose-50 shadow-[0_0_24px_-10px_rgba(251,113,133,0.45)] light:border-rose-200 light:bg-rose-50 light:text-rose-900'
                      : 'rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07] light:border-slate-200 light:bg-slate-50 light:text-slate-800'
                  }
                >
                  {favorited ? 'Favorited' : 'Favorite'}
                </motion.button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] light:border-slate-200 light:bg-white light:text-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <AnimatePresence mode="wait">
                {phase === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                  >
                    <motion.div
                      className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-emerald-400/30 bg-emerald-500/15 text-emerald-100 shadow-[0_0_50px_-12px_rgba(52,211,153,0.45)] light:border-emerald-200 light:bg-emerald-50 light:text-emerald-800"
                      initial={{ rotate: -8, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    >
                      <Sparkles className="h-9 w-9" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-semibold text-white light:text-slate-900">You&apos;re booked (demo)</p>
                      <p className="mt-2 max-w-md text-sm text-slate-400 light:text-slate-600">
                        {selectedSlot
                          ? `We reserved ${selectedSlot.dayLabel} · ${selectedSlot.timeLabel} with ${doctor.name.split(',')[0]}.`
                          : 'Your appointment request was recorded in simulated mode.'}{' '}
                        No calendar invites are sent in this build.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-teal-400/35 hover:bg-teal-500/10 hover:shadow-[0_0_30px_-10px_rgba(45,212,191,0.35)] light:border-slate-200 light:bg-white light:text-slate-900 light:hover:bg-teal-50"
                    >
                      Return to directory
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="space-y-6"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <a
                        href={`mailto:${doctor.email}`}
                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-teal-400/30 hover:bg-white/[0.05] light:border-slate-200 light:bg-white light:hover:bg-slate-50"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-teal-200 light:border-slate-200 light:bg-slate-50 light:text-teal-700">
                          <Mail className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 light:text-slate-600">Email</p>
                          <p className="truncate text-sm font-medium text-white light:text-slate-900">{doctor.email}</p>
                        </div>
                      </a>
                      <a
                        href={`tel:${doctor.phone.replace(/\s/g, '')}`}
                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-violet-400/30 hover:bg-white/[0.05] light:border-slate-200 light:bg-white light:hover:bg-slate-50"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet-100 light:border-slate-200 light:bg-slate-50 light:text-violet-700">
                          <Phone className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 light:text-slate-600">Phone</p>
                          <p className="truncate text-sm font-medium text-white light:text-slate-900">{doctor.phone}</p>
                        </div>
                      </a>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 light:border-slate-200 light:bg-slate-50">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 light:text-slate-600">Clinical focus</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300 light:text-slate-700">{doctor.professionalDescription}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {doctor.availableDays.map((d) => (
                          <span
                            key={d}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200 light:border-slate-200 light:bg-white light:text-slate-800"
                          >
                            <Calendar className="h-3.5 w-3.5 text-teal-300 light:text-teal-600" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white light:text-slate-900">Available times</p>
                        <p className="text-xs text-slate-500 light:text-slate-600">Tap a slot to select</p>
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {doctor.availableSlots.map((slot) => (
                          <SlotCard
                            key={slot.id}
                            slot={slot}
                            selected={slot.id === selectedSlotId}
                            disabled={phase === 'loading'}
                            onSelect={() => setSelectedSlotId(slot.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {phase !== 'success' ? (
              <div className="border-t border-white/10 bg-slate-950/55 px-5 py-4 backdrop-blur-xl sm:px-6 light:border-slate-200 light:bg-white/90">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500 light:text-slate-600">
                    {selectedSlot
                      ? `${selectedSlot.dayLabel} · ${selectedSlot.timeLabel} · ${selectedSlot.consultationType}`
                      : 'Select a time to enable confirmation.'}
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={!selectedSlot || phase === 'loading'}
                    onClick={confirm}
                    className="inline-flex items-center justify-center rounded-full border border-teal-400/35 bg-gradient-to-r from-teal-500/25 via-cyan-400/15 to-violet-500/20 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_40px_-14px_rgba(45,212,191,0.45)] transition disabled:cursor-not-allowed disabled:opacity-40 light:from-teal-600 light:to-indigo-600 light:text-white"
                  >
                    {phase === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-teal-200 light:border-slate-300 light:border-t-teal-600" />
                        Confirming…
                      </span>
                    ) : (
                      'Confirm booking'
                    )}
                  </motion.button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
