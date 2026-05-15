import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Star, Trophy } from 'lucide-react'
import { GlassPanel } from '../ui/GlassPanel.jsx'
import { Badge } from '../ui/Badge.jsx'
import { ApiErrorBanner } from '../ui/ApiErrorBanner.jsx'
import { MicrophonePractice } from './MicrophonePractice.jsx'
import * as speechApi from '../../services/speechApi.js'
import { useApiQuery } from '../../hooks/useApiQuery.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { cn } from '../../lib/cn.js'

export function ChildPracticeTab() {
  const studio = useApiQuery(() => speechApi.getChildPracticeSnapshot(), [])
  const [activeExerciseId, setActiveExerciseId] = useState(null)
  const reduced = useReducedMotion()

  const speechExercises = studio.data?.exercises ?? []
  const activeExercise = useMemo(
    () => speechExercises.find((e) => e.id === activeExerciseId) ?? speechExercises[0],
    [speechExercises, activeExerciseId],
  )

  const childProgress = studio.data?.progressMeta
  const speechScores = studio.data?.scores
  const aiRecommendations = studio.data?.aiRecommendations ?? []
  const childBadges = studio.data?.achievements ?? []

  useEffect(() => {
    if (speechExercises.length && activeExerciseId == null) {
      setActiveExerciseId(speechExercises[0].id)
    }
  }, [speechExercises, activeExerciseId])

  const starPct = useMemo(() => {
    if (!childProgress) return 0
    return Math.min(100, Math.round((childProgress.stars / childProgress.nextRewardAt) * 100))
  }, [childProgress])

  return (
    <motion.div
      className="mx-auto max-w-6xl space-y-6"
      initial={reduced ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-2xl md:text-3xl">
          Hey superstar — ready for a quick practice?
        </h1>
        <p className="text-sm text-slate-300 light:text-slate-700">Pick an exercise, tap the mic, and show off those awesome sounds.</p>
      </div>

      <ApiErrorBanner message={studio.error} onRetry={studio.refetch} />

      {studio.loading ? (
        <motion.div
          className="grid gap-6 lg:grid-cols-5"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-4 lg:col-span-3">
            <div className="h-72 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
            <motion.div className="h-40 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <div className="h-44 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
            <div className="h-40 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
            <div className="h-56 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            {activeExercise?.id ? <MicrophonePractice key={activeExercise.id} exerciseId={activeExercise.id} /> : null}

            {activeExercise ? (
              <GlassPanel>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90 light:text-amber-800">Your mission</p>
                <p className="mt-2 text-lg font-semibold text-white light:text-slate-900">{activeExercise.title}</p>
                <p className="mt-1 text-sm text-slate-300 light:text-slate-700">{activeExercise.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-200 light:text-slate-800">{activeExercise.instruction}</p>
              </GlassPanel>
            ) : null}

            <GlassPanel glow>
              <motion.div
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-200 light:text-violet-800"
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Brain className="h-4 w-4" />
                AI coach (mock ASR API)
              </motion.div>
              <div className="mt-4 space-y-3">
                {aiRecommendations.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/80">
                    <p className="text-sm font-semibold text-white light:text-slate-900">{r.title}</p>
                    <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{r.rationale}</p>
                    <p className="mt-2 text-sm text-slate-200 light:text-slate-800">{r.action}</p>
                    <p className="mt-2 text-[11px] text-slate-500">Model confidence · {Math.round(r.confidence * 100)}%</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <GlassPanel glow>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">Star tracker</p>
                  <p className="mt-1 text-2xl font-semibold text-white light:text-slate-900">
                    {childProgress ? `${childProgress.stars} / ${childProgress.nextRewardAt} stars` : '—'}
                  </p>
                </motion.div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-100">
                  <Star className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 light:bg-slate-900/5 light:ring-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 to-fuchsia-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${starPct}%` }}
                  transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-3 text-xs text-slate-400 light:text-slate-600">
                {childProgress && speechScores
                  ? `${speechScores.pronunciationScore}/100 latest pronunciation index · ${childProgress.nextRewardAt - childProgress.stars} stars to next reward`
                  : 'Loading your progress…'}
              </p>
              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {childProgress ? (
                  <>
                    <Badge tone="success">Level {childProgress.level}</Badge>
                    <Badge tone="info">{childProgress.streakDays}-day streak</Badge>
                  </>
                ) : null}
                {speechScores ? <Badge tone="warning">{speechScores.clarityPct}% clarity (est.)</Badge> : null}
              </motion.div>
            </GlassPanel>

            <GlassPanel>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">Badges</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {childBadges.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={reduced ? undefined : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'rounded-2xl border px-3 py-3 text-center text-xs font-semibold',
                      b.earned
                        ? 'border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100'
                        : 'border-white/10 bg-white/5 text-slate-500 light:border-slate-200 light:bg-white/70 light:text-slate-500',
                    )}
                  >
                    <Trophy className="mx-auto mb-2 h-5 w-5 text-amber-200 light:text-amber-700" />
                    {b.label}
                  </motion.div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">Speech exercises</p>
              <div className="mt-3 grid gap-3">
                {speechExercises.map((ex) => {
                  const active = ex.id === activeExerciseId
                  return (
                    <motion.button
                      key={ex.id}
                      type="button"
                      onClick={() => setActiveExerciseId(ex.id)}
                      whileHover={reduced ? undefined : { y: -2 }}
                      whileTap={reduced ? undefined : { scale: 0.99 }}
                      className={cn(
                        'rounded-2xl border px-4 py-4 text-left transition-colors',
                        active
                          ? 'border-cyan-400/35 bg-gradient-to-r from-cyan-500/15 to-violet-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 light:border-slate-200 light:bg-white/80 light:hover:bg-white',
                      )}
                    >
                      <p className="text-sm font-semibold text-white light:text-slate-900">{ex.title}</p>
                      <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{ex.subtitle}</p>
                    </motion.button>
                  )
                })}
              </div>
            </GlassPanel>
          </div>
        </div>
      )}
    </motion.div>
  )
}
