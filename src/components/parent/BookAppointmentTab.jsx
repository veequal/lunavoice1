import { motion } from 'framer-motion'
import { CalendarPlus, Heart, Sparkles, Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DoctorBookingPanel } from './DoctorBookingPanel.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'
import { MOCK_DOCTORS } from '../../data/mockDoctors.js'
import { cn } from '../../lib/cn.js'

function availabilityLabel(status) {
  if (status === 'available') return { text: 'Accepting visits', tone: 'text-emerald-200 light:text-emerald-700' }
  if (status === 'limited') return { text: 'Limited openings', tone: 'text-amber-200 light:text-amber-700' }
  return { text: 'Waitlist', tone: 'text-rose-200 light:text-rose-700' }
}

function DoctorCardSkeleton({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-glass backdrop-blur-xl light:border-slate-200 light:bg-white/90"
    >
      <div className="flex gap-4">
        <div className="h-20 w-20 shrink-0 animate-pulse rounded-2xl bg-white/10 light:bg-slate-200" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10 light:bg-slate-200" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/10 light:bg-slate-200" />
          <div className="h-3 w-full animate-pulse rounded-full bg-white/10 light:bg-slate-200" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-10 animate-pulse rounded-2xl bg-white/10 light:bg-slate-200" />
        <div className="h-10 animate-pulse rounded-2xl bg-white/10 light:bg-slate-200" />
      </div>
    </motion.div>
  )
}

function DoctorCard({ doctor, delay, favorited, onBook, onToggleFavorite }) {
  const chip = availabilityLabel(doctor.availability)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-glass backdrop-blur-xl light:border-slate-200 light:bg-white/90"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-teal-500/20 to-transparent blur-3xl transition duration-700 group-hover:opacity-100" />
      <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-x-5">
        <div className="relative shrink-0">
          <img
            src={doctor.avatarUrl}
            alt=""
            className="h-24 w-24 rounded-2xl border border-white/10 object-cover shadow-[0_0_40px_-12px_rgba(45,212,191,0.45)] light:border-slate-200 sm:h-28 sm:w-28"
          />
          <span
            className={cn(
              'absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-md light:border-slate-200 light:bg-white/90',
              chip.tone,
            )}
          >
            {chip.text}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white light:text-slate-900">{doctor.name}</h2>
              <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{doctor.specialty}</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-amber-100 light:border-slate-200 light:bg-amber-50 light:text-amber-900">
              <Star className="h-3.5 w-3.5 text-amber-300 light:text-amber-600" />
              {doctor.rating.toFixed(2)}
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 light:text-slate-700">{doctor.bio}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 light:text-slate-600">
            {doctor.yearsExperience}+ yrs experience · {doctor.availableDays.join(' · ')}
          </p>
        </div>
      </div>

      <div className="relative mt-5 flex min-w-0 flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-3">
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          onClick={onBook}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-teal-400/35 bg-gradient-to-r from-teal-500/25 via-cyan-400/15 to-violet-500/15 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_34px_-14px_rgba(45,212,191,0.45)] transition hover:border-teal-300/55 light:from-teal-600 light:to-indigo-600 light:text-white"
        >
          <CalendarPlus className="h-4 w-4" />
          Book appointment
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          onClick={onToggleFavorite}
          aria-pressed={favorited}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition sm:w-44',
            favorited
              ? 'border-rose-400/35 bg-rose-500/15 text-rose-50 shadow-[0_0_30px_-12px_rgba(251,113,133,0.35)] light:border-rose-200 light:bg-rose-50 light:text-rose-900'
              : 'border-white/10 bg-white/[0.04] text-slate-100 hover:border-white/20 hover:bg-white/[0.07] light:border-slate-200 light:bg-white light:text-slate-800',
          )}
        >
          <motion.span
            key={favorited ? 'on' : 'off'}
            initial={{ scale: 0.85, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          >
            <Heart className={cn('h-4 w-4', favorited && 'fill-current')} />
          </motion.span>
          {favorited ? 'Saved' : 'Add to favorites'}
        </motion.button>
      </div>
    </motion.article>
  )
}

export function BookAppointmentTab() {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])
  const [activeDoctor, setActiveDoctor] = useState(null)
  const [bookingEpoch, setBookingEpoch] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => {
      setDoctors(MOCK_DOCTORS)
      setLoading(false)
    }, 720)
    return () => window.clearTimeout(t)
  }, [])

  const sorted = useMemo(() => [...doctors].sort((a, b) => b.rating - a.rating), [doctors])

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 light:border-slate-200 light:bg-white light:text-slate-600"
          >
            <CalendarPlus className="h-3.5 w-3.5 text-teal-300 light:text-teal-600" />
            Care network
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-3xl"
          >
            Book a LunaVoice clinician
          </motion.h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 light:text-slate-600">
            Browse curated pediatric speech partners, compare availability, and run a polished mock booking flow — no backend
            required.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 light:border-slate-200 light:bg-white light:text-slate-700">
          <Sparkles className="h-3.5 w-3.5 text-violet-200 light:text-violet-600" />
          <span className="font-medium text-slate-200 light:text-slate-800">Mock scheduling · instant UI</span>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <DoctorCardSkeleton key={i} delay={i * 0.05} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {sorted.map((doctor, idx) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              delay={idx * 0.06}
              favorited={isFavorite(doctor.id)}
              onBook={() => {
                setActiveDoctor(doctor)
                setBookingEpoch((e) => e + 1)
              }}
              onToggleFavorite={() => toggleFavorite(doctor)}
            />
          ))}
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
