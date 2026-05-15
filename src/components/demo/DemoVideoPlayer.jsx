import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, Pause, Play, Radio, VolumeX } from 'lucide-react'
import { demoScenes, TOTAL_DEMO_MS } from '../../mock/demoWalkthrough.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { DemoSceneFrame } from './DemoSceneFrame.jsx'
import { cn } from '../../lib/cn.js'

function formatTime(ms) {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const rem = s % 60
  return `${m}:${rem.toString().padStart(2, '0')}`
}

/** @param {{ className?: string }} props */
export function DemoVideoPlayer({ className = '' }) {
  const reduced = useReducedMotion()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const rootRef = useRef(null)
  const rafRef = useRef(0)
  const sceneIndexRef = useRef(0)

  const scene = demoScenes[sceneIndex]
  /** Walkthrough always runs when playing — no hover/in-view gate (silent visual demo). */
  const isSimulating = playing

  sceneIndexRef.current = sceneIndex

  const advanceScene = useCallback(() => {
    setSceneIndex((i) => (i + 1) % demoScenes.length)
    setElapsed(0)
  }, [])

  useEffect(() => {
    const onPlayRequest = () => setPlaying(true)
    window.addEventListener('lunavoice-demo-play', onPlayRequest)
    return () => window.removeEventListener('lunavoice-demo-play', onPlayRequest)
  }, [])

  useEffect(() => {
    if (!isSimulating) return

    const duration = demoScenes[sceneIndexRef.current].durationMs
    const timer = window.setTimeout(advanceScene, duration)
    return () => window.clearTimeout(timer)
  }, [isSimulating, sceneIndex, advanceScene])

  useEffect(() => {
    if (!isSimulating) return

    const started = performance.now()
    const tick = (now) => {
      setElapsed(now - started)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isSimulating, sceneIndex])

  const progressPct = (() => {
    let before = 0
    for (let i = 0; i < sceneIndex; i++) before += demoScenes[i].durationMs
    return Math.min(100, ((before + elapsed) / TOTAL_DEMO_MS) * 100)
  })()

  const displayElapsed = (() => {
    let before = 0
    for (let i = 0; i < sceneIndex; i++) before += demoScenes[i].durationMs
    return before + elapsed
  })()

  const togglePlay = () => setPlaying((p) => !p)

  const sceneTransition = reduced
    ? { duration: 0.15 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

  return (
    <motion.div
      ref={rootRef}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-indigo-400/25 bg-slate-950/60 shadow-glow backdrop-blur-2xl transition-shadow duration-300 hover:border-indigo-400/40 hover:shadow-glow light:border-indigo-200/60 light:bg-white/90',
        expanded && 'lg:scale-[1.02]',
        className,
      )}
      layout
    >
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/80 light:from-slate-100 light:via-white light:to-indigo-50">
        {!reduced && isSimulating ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
        ) : null}

        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider',
              isSimulating
                ? 'border-rose-400/40 bg-rose-500/20 text-rose-100 light:border-rose-300 light:bg-rose-50 light:text-rose-800'
                : 'border-white/15 bg-white/10 text-slate-300 light:border-slate-200 light:bg-white light:text-slate-600',
            )}
          >
            <Radio className={cn('h-3 w-3', isSimulating && 'animate-pulse')} />
            {isSimulating ? 'Live demo' : 'Paused'}
          </span>
          <span className="rounded-full border border-white/10 bg-slate-950/70 px-2 py-0.5 text-[10px] text-slate-400 backdrop-blur light:border-slate-200 light:bg-white/90 light:text-slate-600">
            No audio · visual only
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            className="absolute inset-0 z-0"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={sceneTransition}
          >
            <DemoSceneFrame sceneId={scene.id} />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {scene.tooltip && isSimulating ? (
            <motion.div
              key={`${scene.id}-tip`}
              className="absolute bottom-16 right-4 z-10 max-w-[200px] rounded-xl border border-white/15 bg-slate-950/85 px-3 py-2 text-[11px] font-medium text-slate-100 shadow-glass backdrop-blur-xl light:border-slate-200 light:bg-white/95 light:text-slate-800"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-teal-400" />
              {scene.tooltip}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-t from-slate-950/95 to-transparent light:from-white/95" />

        {!isSimulating ? (
          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-indigo-500/40 text-white shadow-glow backdrop-blur-md transition hover:scale-105 light:border-indigo-200 light:bg-indigo-100 light:text-indigo-800"
            onClick={() => setPlaying(true)}
            aria-label="Play demo"
          >
            <Play className="ml-0.5 h-7 w-7" />
          </button>
        ) : null}
      </div>

      <div className="relative border-t border-white/10 bg-slate-950/80 px-3 py-2.5 light:border-slate-200 light:bg-white/90 sm:px-4">
        <motion.div className="mb-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white light:text-slate-900">{scene.title}</p>
            <p className="truncate text-[10px] text-slate-400 light:text-slate-600">{scene.subtitle}</p>
          </div>
          <span className="shrink-0 text-[10px] tabular-nums text-slate-500">
            {formatTime(displayElapsed)} / {formatTime(TOTAL_DEMO_MS)}
          </span>
        </motion.div>

        <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={playing ? 'Pause demo' : 'Play demo'}
              onClick={togglePlay}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 light:border-slate-200 light:bg-slate-50 light:text-slate-800"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              aria-label="Muted — visual demo only"
              disabled
              className="inline-flex h-8 w-8 cursor-default items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-500 opacity-70 light:border-slate-200 light:bg-slate-50"
            >
              <VolumeX className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-1">
            {demoScenes.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to ${s.title}`}
                onClick={() => {
                  setSceneIndex(i)
                  setElapsed(0)
                  setPlaying(true)
                }}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === sceneIndex ? 'w-4 bg-indigo-400' : 'w-1.5 bg-white/20 light:bg-slate-300',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Expand preview"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 light:border-slate-200 light:bg-slate-50 light:text-slate-800"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
