import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gamepad2, Sparkles, Star, Zap } from 'lucide-react'
import { FEATURED_GAMES } from '../../mock/gameWords.js'
import { childGamePath } from '../../lib/routeKeys.js'
import { GlowButton } from '../ui/GlowButton.jsx'
import { GlassPanel } from '../ui/GlassPanel.jsx'
import { Badge } from '../ui/Badge.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { cn } from '../../lib/cn.js'

export function GamesHub() {
  const reduced = useReducedMotion()
  const featured = FEATURED_GAMES[0]

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <motion.header
        className="space-y-2"
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-100 light:text-violet-800"
          animate={reduced ? undefined : { boxShadow: ['0 0 0 rgba(139,92,246,0)', '0 0 20px rgba(139,92,246,0.25)', '0 0 0 rgba(139,92,246,0)'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Gamepad2 className="h-3.5 w-3.5" />
          Speech Adventure Games
        </motion.div>
        <h1 className="text-2xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-3xl">
          Speech Adventure Games
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 light:text-slate-700">
          Practice speaking while having fun with interactive AI-powered speech games.
        </p>
      </motion.header>

      <motion.div
        className="grid gap-4 lg:grid-cols-3"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassPanel
          glow
          className={cn(
            'group relative col-span-full overflow-hidden border-violet-400/20 lg:col-span-2',
            'transition-shadow duration-300',
            featured.borderGlow,
          )}
          padding="p-0"
        >
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', featured.gradient)} />
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <motion.div
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-5xl shadow-glow-sm backdrop-blur-md"
              whileHover={reduced ? undefined : { scale: 1.05, rotate: 3 }}
            >
              {featured.icon}
            </motion.div>
            <motion.div
              className="min-w-0 flex-1"
              initial={reduced ? undefined : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="success">Featured</Badge>
                <Badge tone="info">{featured.difficulty}</Badge>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white light:text-slate-900">{featured.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200 light:text-slate-700">{featured.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300 light:text-slate-600">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 font-semibold text-amber-100">
                  <Zap className="h-3.5 w-3.5" />
                  +{featured.xpReward} XP
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-300" />
                  Earn stars & badges
                </span>
              </div>
              <Link to={childGamePath(featured.slug)} className="mt-5 inline-block">
                <GlowButton className="!from-amber-500 !to-fuchsia-500 shadow-[0_0_24px_rgba(217,70,239,0.35)]">
                  <Sparkles className="h-4 w-4" />
                  Play Game
                </GlowButton>
              </Link>
            </motion.div>
          </div>
        </GlassPanel>

        <GlassPanel glow className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">Daily challenge</p>
          <p className="mt-2 text-lg font-semibold text-white light:text-slate-900">Say 3 words in a row</p>
          <p className="mt-2 text-sm text-slate-300 light:text-slate-700">Complete today&apos;s mini challenge for bonus XP.</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
              initial={{ width: '33%' }}
              animate={{ width: '33%' }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">1 of 3 words · +30 XP bonus</p>
        </GlassPanel>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            whileHover={reduced ? undefined : { y: -4, scale: 1.02 }}
          >
            <GlassPanel className="h-full border-white/10 transition-all hover:border-fuchsia-400/30 hover:shadow-[0_0_28px_rgba(217,70,239,0.15)]">
              <div className="text-3xl">{game.icon}</div>
              <p className="mt-3 text-sm font-semibold text-white light:text-slate-900">{game.title}</p>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-600 line-clamp-2">{game.description}</p>
              <Link to={childGamePath(game.slug)} className="mt-4 inline-block">
                <GlowButton variant="secondary" className="!text-xs">
                  Play
                </GlowButton>
              </Link>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
