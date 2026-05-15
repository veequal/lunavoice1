import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, Heart, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DoctorBookingPanel } from './DoctorBookingPanel.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'
import { MOCK_DOCTORS } from '../../data/mockDoctors.js'

export function FavoriteDoctorsTab() {
  const { favoriteIds, removeFavorite, isFavorite, toggleFavorite } = useFavorites()
  const [activeDoctor, setActiveDoctor] = useState(null)
  const [bookingEpoch, setBookingEpoch] = useState(0)

  const favorites = useMemo(() => MOCK_DOCTORS.filter((d) => favoriteIds.has(d.id)), [favoriteIds])

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-balance text-2xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-3xl"
          >
            Favorite Doctors
          </motion.h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 light:text-slate-600">
            Your shortlist stays on-device for this demo. Remove anyone instantly or jump back into booking with one tap.
          </p>
        </div>
        <Link
          to="/parent-dashboard/book-appointment"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-teal-400/35 hover:bg-teal-500/10 hover:shadow-[0_0_30px_-12px_rgba(45,212,191,0.35)] light:border-slate-200 light:bg-white light:text-slate-800 light:hover:bg-teal-50"
        >
          Browse directory
        </Link>
      </div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center backdrop-blur-xl light:border-slate-300 light:bg-white/80"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 light:border-slate-200 light:bg-slate-50 light:text-slate-700">
            <Heart className="h-6 w-6" />
          </div>
          <p className="mt-4 text-lg font-semibold text-white light:text-slate-900">No favorites yet</p>
          <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
            Tap <span className="font-semibold text-slate-200 light:text-slate-900">Add to favorites</span> on any clinician card to pin them
            here.
          </p>
          <Link
            to="/parent-dashboard/book-appointment"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-400/35 bg-teal-500/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-500/15 light:bg-teal-50 light:text-teal-900 light:hover:bg-teal-100"
          >
            <CalendarPlus className="h-4 w-4" />
            Go to Book Appointment
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <AnimatePresence>
            {favorites.map((doctor, idx) => (
              <motion.article
                key={doctor.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: idx * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl light:border-slate-200 light:bg-white/90"
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={doctor.avatarUrl}
                      alt=""
                      className="h-20 w-20 rounded-2xl border border-white/10 object-cover shadow-[0_0_30px_-10px_rgba(167,139,250,0.35)] light:border-slate-200"
                    />
                    <motion.span
                      layout
                      className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-500/20 text-rose-50 light:border-rose-200 light:bg-rose-100 light:text-rose-700"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <Heart className="h-3.5 w-3.5 fill-current" />
                    </motion.span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-semibold text-white light:text-slate-900">{doctor.name}</h2>
                    <p className="truncate text-sm text-slate-400 light:text-slate-600">{doctor.specialty}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300 light:text-slate-700">{doctor.bio}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      setActiveDoctor(doctor)
                      setBookingEpoch((e) => e + 1)
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-teal-400/35 bg-gradient-to-r from-teal-500/20 to-violet-500/15 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-14px_rgba(45,212,191,0.45)] light:from-teal-600 light:to-indigo-600 light:text-white"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Quick book
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => removeFavorite(doctor.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-rose-400/35 hover:bg-rose-500/10 hover:text-rose-50 light:border-slate-200 light:bg-white light:text-slate-800 light:hover:bg-rose-50 light:hover:text-rose-900"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      <DoctorBookingPanel
        key={bookingEpoch}
        doctor={activeDoctor}
        open={!!activeDoctor}
        onClose={() => setActiveDoctor(null)}
        favorited={activeDoctor ? isFavorite(activeDoctor.id) : false}
        onToggleFavorite={() => {
          if (activeDoctor) toggleFavorite(activeDoctor)
        }}
      />
    </div>
  )
}
