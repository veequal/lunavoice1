import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Sparkles } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'
import { GlassPanel } from '../ui/GlassPanel.jsx'
import { ApiErrorBanner } from '../ui/ApiErrorBanner.jsx'
import { SpeechWaveVisualizer } from './SpeechWaveVisualizer.jsx'
import * as speechApi from '../../services/speechApi.js'

export function MicrophonePractice({ exerciseId = 'practice' }) {
  const [phase, setPhase] = useState('idle') // idle | listening | scoring | result
  const [score, setScore] = useState(null)
  const [clarity, setClarity] = useState(null)
  const [apiErr, setApiErr] = useState(null)
  const [encouragement, setEncouragement] = useState(null)
  const attemptRef = useRef(0)

  const loadEncouragement = useCallback(async () => {
    const res = await speechApi.getEncouragementForExercise(exerciseId)
    if (res.ok) setEncouragement(res.data)
  }, [exerciseId])

  useEffect(() => {
    loadEncouragement()
  }, [loadEncouragement])

  const encouragementText = useMemo(() => encouragement?.text ?? 'Tap start, say the practice phrase, then listen for your score.', [encouragement])

  const start = useCallback(() => {
    attemptRef.current += 1
    setPhase('listening')
    setScore(null)
    setClarity(null)
    setApiErr(null)
  }, [])

  useEffect(() => {
    if (phase !== 'listening') return undefined
    const t1 = window.setTimeout(() => setPhase('scoring'), 2200)
    return () => window.clearTimeout(t1)
  }, [phase])

  useEffect(() => {
    if (phase !== 'scoring') return undefined
    let cancelled = false
    speechApi.analyzeSpeech({ exerciseId, attempt: attemptRef.current }).then((res) => {
      if (cancelled) return
      if (res.ok && res.data) {
        setScore(res.data.pronunciationScore)
        setClarity(res.data.clarityPct)
        setPhase('result')
      } else {
        setApiErr(res.error?.message ?? 'Could not score this attempt (mock).')
        setPhase('idle')
      }
    })
    return () => {
      cancelled = true
    }
  }, [phase, exerciseId])

  const listening = phase === 'listening' || phase === 'scoring'

  return (
    <GlassPanel className="relative overflow-hidden" glow padding="p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

      <ApiErrorBanner message={apiErr} onRetry={() => setApiErr(null)} />

      <div className="relative flex flex-col items-center text-center">
        <motion.button
          type="button"
          onClick={start}
          disabled={phase === 'listening' || phase === 'scoring'}
          className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-indigo-500/35 to-fuchsia-500/25 shadow-glow disabled:opacity-60"
          whileHover={{ scale: phase === 'idle' || phase === 'result' ? 1.03 : 1 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Start speaking practice"
        >
          <div className="absolute inset-0 rounded-full bg-white/5" />
          <Mic className="relative h-10 w-10 text-white" />
          {listening ? (
            <motion.span
              className="absolute inset-0 rounded-full border border-cyan-300/35"
              animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.15, 0.55] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : null}
        </motion.button>

        <GlowButton type="button" onClick={start} disabled={phase === 'listening' || phase === 'scoring'} className="mb-6">
          Start Speaking
        </GlowButton>

        <SpeechWaveVisualizer active={listening} />

        <div className="mt-6 w-full max-w-md">
          <p className="text-xs text-slate-500 light:text-slate-600">
            Microphone processing is simulated — audio is not transmitted in this demo build.
          </p>

          {phase === 'idle' ? <p className="mt-3 text-sm text-slate-300">{encouragementText}</p> : null}

          {phase === 'listening' ? <p className="mt-3 text-sm text-cyan-100">Listening… keep the mic steady.</p> : null}

          {phase === 'scoring' ? (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-200">
              <Sparkles className="h-4 w-4 animate-pulse text-amber-300" />
              LunaVoice ASR scoring…
            </div>
          ) : null}

          {phase === 'result' && score != null ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pronunciation score</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-white">{score}</p>
                {clarity != null ? <p className="mt-1 text-sm text-slate-300">Clarity estimate · {clarity}%</p> : null}
                <p className="mt-2 text-sm text-slate-300">{encouragementText}</p>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </GlassPanel>
  )
}
