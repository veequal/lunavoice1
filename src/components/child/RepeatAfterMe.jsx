import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Brain, Mic, Sparkles, Star } from 'lucide-react'
import { GAME_WORDS, MOCK_FEEDBACK, ACHIEVEMENTS } from '../../mock/gameWords.js'
import { childDashboardPath } from '../../lib/routeKeys.js'
import { GameTutorial } from './GameTutorial.jsx'
import { SpeechWave } from './SpeechWave.jsx'
import { XPBar } from './XPBar.jsx'
import { AchievementPopup } from './AchievementPopup.jsx'
import { GlowButton } from '../ui/GlowButton.jsx'
import { GlassPanel } from '../ui/GlassPanel.jsx'
import { Badge } from '../ui/Badge.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { cn } from '../../lib/cn.js'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

function pickFeedback(score) {
  if (score >= 85) return MOCK_FEEDBACK.excellent[Math.floor(Math.random() * MOCK_FEEDBACK.excellent.length)]
  if (score >= 65) return MOCK_FEEDBACK.good[Math.floor(Math.random() * MOCK_FEEDBACK.good.length)]
  return MOCK_FEEDBACK.improve[Math.floor(Math.random() * MOCK_FEEDBACK.improve.length)]
}

function mockScore(difficulty) {
  const base = difficulty === 'Hard' ? 55 : difficulty === 'Medium' ? 68 : 72
  return Math.min(99, Math.max(42, base + Math.floor(Math.random() * 28)))
}

export function RepeatAfterMe() {
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState('intro') // intro | play
  const [wordIndex, setWordIndex] = useState(0)
  const [gamePhase, setGamePhase] = useState('idle') // idle | listening | analyzing | result
  const [score, setScore] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [difficulty, setDifficulty] = useState('Easy')
  const [xp, setXp] = useState(120)
  const [level, setLevel] = useState(3)
  const [stars, setStars] = useState(8)
  const [streak, setStreak] = useState(2)
  const [achievement, setAchievement] = useState(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [roundsPlayed, setRoundsPlayed] = useState(0)

  const currentWord = GAME_WORDS[wordIndex % GAME_WORDS.length]
  const listening = gamePhase === 'listening' || gamePhase === 'analyzing'

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (gamePhase !== 'listening') return undefined
    const t = window.setTimeout(() => setGamePhase('analyzing'), 2200)
    return () => window.clearTimeout(t)
  }, [gamePhase])

  useEffect(() => {
    if (gamePhase !== 'analyzing') return undefined
    const t = window.setTimeout(() => {
      const nextScore = mockScore(difficulty)
      setScore(nextScore)
      setFeedback(pickFeedback(nextScore))
      const xpGain = Math.round(nextScore / 4) + (difficulty === 'Hard' ? 15 : difficulty === 'Medium' ? 8 : 0)
      setXp((v) => v + xpGain)
      if (nextScore >= 80) setStars((s) => s + 1)
      setStreak((s) => s + 1)
      setRoundsPlayed((r) => r + 1)
      setGamePhase('result')
      if (roundsPlayed === 0 && nextScore >= 75) {
        setAchievement(ACHIEVEMENTS[0])
        setShowAchievement(true)
      } else if (roundsPlayed === 2 && nextScore >= 90) {
        setAchievement(ACHIEVEMENTS[2])
        setShowAchievement(true)
      }
    }, 1400)
    return () => window.clearTimeout(t)
  }, [gamePhase, difficulty, roundsPlayed])

  const starCount = useMemo(() => {
    if (score == null) return 0
    if (score >= 90) return 3
    if (score >= 75) return 2
    if (score >= 60) return 1
    return 0
  }, [score])

  const startRound = useCallback(() => {
    setScore(null)
    setFeedback(null)
    setGamePhase('listening')
  }, [])

  const nextWord = useCallback(() => {
    setWordIndex((i) => (i + 1) % GAME_WORDS.length)
    setGamePhase('idle')
    setScore(null)
    setFeedback(null)
  }, [])

  if (loading) {
    return (
      <motion.div
        className="mx-auto flex max-w-lg flex-col items-center justify-center py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-14 w-14 rounded-full border-2 border-amber-400/30 border-t-amber-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="mt-4 text-sm text-slate-400">Loading Repeat After Me…</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="mx-auto max-w-3xl space-y-6"
      initial={reduced ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to={childDashboardPath('games')}>
          <GlowButton variant="secondary" className="!px-3 !py-2">
            <ArrowLeft className="h-4 w-4" />
            Games hub
          </GlowButton>
        </Link>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={cn(
                'rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all',
                difficulty === d
                  ? 'border-amber-400/40 bg-amber-400/15 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.2)]'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 light:border-slate-200 light:bg-white/80',
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <XPBar xp={xp % 100} level={level} streak={streak} stars={stars} />

      <AnimatePresence mode="wait">
        {phase === 'intro' ? (
          <motion.div
            key="intro"
            initial={reduced ? undefined : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: 12 }}
          >
            <GlassPanel glow>
              <div className="flex items-center gap-2 text-amber-200 light:text-amber-800">
                <Sparkles className="h-5 w-5" />
                <h1 className="text-xl font-semibold text-white light:text-slate-900">Repeat After Me</h1>
              </div>
              <p className="mt-2 text-sm text-slate-300 light:text-slate-700">
                Listen, repeat, and earn stars — LunaVoice AI feedback is simulated in this demo.
              </p>
            </GlassPanel>
            <motion.div className="mt-6">
              <GameTutorial />
            </motion.div>
            <GlowButton type="button" onClick={() => setPhase('play')} className="mt-6 w-full sm:w-auto">
              Start playing
            </GlowButton>
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={reduced ? undefined : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -12 }}
            className="space-y-6"
          >
            <GlassPanel glow className="relative overflow-hidden" padding="p-6 sm:p-10">
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-amber-500/10"
                animate={listening && !reduced ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 0.5 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex flex-col items-center text-center">
                <Badge tone="warning">{difficulty}</Badge>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord.id}
                    className="mt-6 w-full max-w-md"
                    initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
                  >
                    <motion.div
                      className="rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/80 to-violet-950/50 px-8 py-10 shadow-[0_0_40px_rgba(139,92,246,0.15)] light:from-white light:to-violet-50"
                      whileHover={reduced ? undefined : { scale: 1.01 }}
                    >
                      <p className="text-6xl" aria-hidden>
                        {currentWord.emoji}
                      </p>
                      <p className="mt-4 text-4xl font-bold tracking-widest text-white light:text-slate-900">{currentWord.word}</p>
                      <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{currentWord.hint}</p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={startRound}
                  disabled={listening}
                  className="relative mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-amber-400/30 bg-gradient-to-br from-amber-500/30 to-fuchsia-500/25 shadow-[0_0_32px_rgba(251,191,36,0.25)] disabled:opacity-60"
                  whileHover={!listening ? { scale: 1.05 } : undefined}
                  whileTap={!listening ? { scale: 0.97 } : undefined}
                  aria-label="Press microphone to speak"
                >
                  <Mic className="h-10 w-10 text-white" />
                  {listening ? (
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-cyan-300/40"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.1, 0.6] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  ) : null}
                </motion.button>

                <SpeechWave active={listening} className="mt-4 w-full" />

                {gamePhase === 'listening' ? (
                  <p className="mt-2 text-sm text-cyan-100">AI listening… say &ldquo;{currentWord.word}&rdquo; aloud!</p>
                ) : null}
                {gamePhase === 'analyzing' ? (
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-200">
                    <Brain className="h-4 w-4 animate-pulse text-violet-300" />
                    LunaVoice analyzing pronunciation…
                  </div>
                ) : null}

                {gamePhase === 'result' && score != null ? (
                  <motion.div
                    className="mt-6 w-full max-w-md space-y-4"
                    initial={reduced ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={cn(
                        'rounded-2xl border p-5',
                        score >= 80
                          ? 'border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_24px_rgba(52,211,153,0.15)]'
                          : 'border-white/10 bg-white/5',
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pronunciation score</p>
                      <p className="mt-1 text-4xl font-semibold text-white light:text-slate-900">{score}</p>
                      <p className="mt-2 text-sm text-slate-200 light:text-slate-800">{feedback}</p>
                      <motion.div
                        className="mt-3 flex justify-center gap-1"
                        initial={reduced ? undefined : { scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        {[1, 2, 3].map((n) => (
                          <Star
                            key={n}
                            className={cn(
                              'h-6 w-6',
                              n <= starCount ? 'fill-amber-300 text-amber-300' : 'text-slate-600',
                            )}
                          />
                        ))}
                      </motion.div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <GlowButton type="button" onClick={nextWord}>
                        Next word
                      </GlowButton>
                      <GlowButton type="button" variant="secondary" onClick={startRound}>
                        Try again
                      </GlowButton>
                    </div>
                  </motion.div>
                ) : null}

                {gamePhase === 'idle' ? (
                  <p className="mt-4 text-xs text-slate-500">Tap the mic — speech is simulated, not recorded.</p>
                ) : null}
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Progress</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {GAME_WORDS.map((w, i) => (
                  <span
                    key={w.id}
                    className={cn(
                      'rounded-xl border px-3 py-2 text-lg',
                      i === wordIndex % GAME_WORDS.length
                        ? 'border-amber-400/35 bg-amber-400/10'
                        : 'border-white/10 bg-white/5 opacity-60',
                    )}
                  >
                    {w.emoji}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      <AchievementPopup
        open={showAchievement}
        achievement={achievement}
        onClose={() => setShowAchievement(false)}
      />
    </motion.div>
  )
}
