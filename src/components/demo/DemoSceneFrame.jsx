import { motion } from 'framer-motion'
import {
  Brain,
  CalendarCheck,
  FileLock2,
  Mic,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import { SpeechWaveVisualizer } from '../child/SpeechWaveVisualizer.jsx'
import { cn } from '../../lib/cn.js'

function MiniSidebar({ accent }) {
  const dot =
    accent === 'teal' ? 'bg-teal-400' : accent === 'amber' ? 'bg-amber-400' : 'bg-indigo-400'
  return (
    <div className="flex w-10 shrink-0 flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/80 p-2 light:border-slate-200 light:bg-slate-100">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={cn('h-2 w-2 rounded-full', i === 1 ? dot : 'bg-white/15 light:bg-slate-300')} />
      ))}
    </div>
  )
}

/** @param {{ sceneId: string }} props */
export function DemoSceneFrame({ sceneId }) {
  if (sceneId === 'parent-login') {
    return (
      <motion.div className="flex h-full gap-3 p-4">
        <MiniSidebar accent="teal" />
        <div className="flex flex-1 flex-col justify-center gap-3">
          <motion.div
            className="flex items-center gap-2 text-teal-200 light:text-teal-700"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wide">Parent hub</span>
          </motion.div>
          <p className="text-lg font-semibold text-white light:text-slate-900">Welcome back, Priya</p>
          <div className="rounded-xl border border-teal-400/25 bg-teal-500/10 p-3 light:border-teal-200 light:bg-teal-50">
            <p className="text-[11px] text-slate-400 light:text-slate-600">Avery&apos;s clarity</p>
            <p className="text-2xl font-semibold text-teal-100 light:text-teal-800">+18%</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300"
                initial={{ width: '0%' }}
                animate={{ width: '72%' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (sceneId === 'child-practice') {
    return (
      <motion.div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-500/15 text-amber-100 light:border-amber-200 light:bg-amber-50 light:text-amber-700"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <Mic className="h-7 w-7" />
        </motion.div>
        <p className="text-sm font-medium text-white light:text-slate-900">&quot;Say butterfly slowly…&quot;</p>
        <SpeechWaveVisualizer active />
      </motion.div>
    )
  }

  if (sceneId === 'ai-analysis') {
    return (
      <motion.div className="flex h-full items-center justify-center gap-6 p-4">
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500/10 light:border-indigo-200 light:bg-indigo-50"
          animate={{ boxShadow: ['0 0 0 0 rgba(129,140,248,0.3)', '0 0 32px 4px rgba(129,140,248,0.25)', '0 0 0 0 rgba(129,140,248,0.3)'] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-3xl font-semibold text-indigo-100 light:text-indigo-800">87</span>
          <Brain className="absolute -right-1 -top-1 h-5 w-5 text-violet-300 light:text-violet-600" />
        </motion.div>
        <div className="space-y-2">
          {['/r/ medial', 'Cluster reduction', 'Vowel clarity'].map((label, i) => (
            <motion.div
              key={label}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 light:border-slate-200 light:bg-white light:text-slate-800"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * i }}
            >
              <span className="text-emerald-300 light:text-emerald-700">✓</span> {label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (sceneId === 'therapist-review') {
    return (
      <motion.div className="flex h-full gap-3 p-4">
        <MiniSidebar accent="indigo" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-2 text-indigo-200 light:text-indigo-700">
            <Stethoscope className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Clinician workspace</span>
          </div>
          <div className="flex items-end gap-1.5">
            {[40, 62, 55, 78, 70, 88].map((h, i) => (
              <motion.div
                key={i}
                className="w-4 rounded-t-md bg-gradient-to-t from-indigo-600/40 to-indigo-300/90"
                initial={{ height: 8 }}
                animate={{ height: h }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              />
            ))}
          </div>
          <motion.div
            className="rounded-xl border border-violet-400/25 bg-violet-500/10 p-2.5 light:border-violet-200 light:bg-violet-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-200 light:text-violet-800">
              <Sparkles className="h-3.5 w-3.5" /> AI summary draft
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-300 light:text-slate-600">
              Avery showed stronger /r/ clusters in structured drills…
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (sceneId === 'book-appointment') {
    return (
      <motion.div className="flex h-full flex-col justify-center gap-3 p-5">
        <div className="flex items-center gap-2 text-teal-200 light:text-teal-700">
          <CalendarCheck className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wide">Book appointment</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Mon', 'Tue', 'Wed'].map((d, i) => (
            <motion.div
              key={d}
              className={cn(
                'rounded-lg border px-2 py-3 text-center text-[11px]',
                i === 1
                  ? 'border-teal-400/50 bg-teal-500/20 text-teal-100 light:border-teal-300 light:bg-teal-50 light:text-teal-900'
                  : 'border-white/10 bg-white/5 text-slate-400 light:border-slate-200 light:bg-white light:text-slate-600',
              )}
              animate={i === 1 ? { scale: [1, 1.04, 1] } : undefined}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {d}
              <p className="mt-1 text-[10px] opacity-80">{i === 1 ? '10:30 AM' : '—'}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-xs text-slate-400 light:text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Dr. Ellis · Telehealth · Confirmed
        </motion.p>
      </motion.div>
    )
  }

  if (sceneId === 'secure-records') {
    return (
      <motion.div className="flex h-full flex-col justify-center gap-3 p-5">
        <div className="flex items-center gap-2 text-indigo-200 light:text-indigo-700">
          <FileLock2 className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wide">Secure vault</span>
        </div>
        {['Consent.pdf', 'Session note — AI draft', 'Pronunciation report'].map((doc, i) => (
          <motion.div
            key={doc}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 light:border-slate-200 light:bg-white"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 * i }}
          >
            <span className="text-xs text-slate-200 light:text-slate-800">{doc}</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-300 light:text-emerald-600" />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return null
}
