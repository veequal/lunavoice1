import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getParentDashboardTab,
  isInvalidParentDashboardPath,
  parentDashboardPath,
} from '../lib/routeKeys.js'
import {
  BookOpen,
  CalendarDays,
  Flame,
  HeartHandshake,
  MessageCircle,
  Mic,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { DashboardShell } from '../components/layout/DashboardShell.jsx'
import { StatCard } from '../components/ui/StatCard.jsx'
import { SectionHeader } from '../components/ui/SectionHeader.jsx'
import { GlassPanel } from '../components/ui/GlassPanel.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ApiErrorBanner } from '../components/ui/ApiErrorBanner.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { ChartCard } from '../components/charts/ChartCard.jsx'
import { MinutesBarChart } from '../components/charts/MinutesBarChart.jsx'
import { PronunciationAreaChart } from '../components/charts/PronunciationAreaChart.jsx'
import { parentNavItems } from '../config/dashboardNav.js'
import * as medicalApi from '../services/medicalApi.js'
import * as speechApi from '../services/speechApi.js'
import { useApiQuery } from '../hooks/useApiQuery.js'
import { formatDateTime, formatShortDate } from '../lib/format.js'
import { cn } from '../lib/cn.js'
import { BookAppointmentTab } from '../components/parent/BookAppointmentTab.jsx'
import { FavoriteDoctorsTab } from '../components/parent/FavoriteDoctorsTab.jsx'

const achievementIcons = {
  flame: Flame,
  sparkles: Sparkles,
  book: BookOpen,
  mic: Mic,
}

function Sparkline({ values }) {
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  return (
    <div className="flex h-10 items-end gap-0.5" aria-hidden>
      {values.map((v, i) => {
        const h = 4 + ((v - min) / range) * 28
        return <div key={i} className="w-1 rounded-full bg-teal-300/70" style={{ height: `${h}px` }} />
      })}
    </div>
  )
}

function AchievementList({ rewards, loading }) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
        ))}
      </div>
    )
  }
  const rows = rewards ?? []
  if (!rows.length) {
    return <EmptyState title="No rewards yet" description="Complete practice sessions to unlock family milestones." />
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rows.map((a) => {
        const Icon = achievementIcons[a.icon] ?? Sparkles
        return (
          <GlassPanel key={a.id} glow={a.unlocked} padding="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-teal-100 light:border-slate-200 light:bg-white light:text-teal-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white light:text-slate-900">{a.title}</p>
                  <p className="mt-1 text-sm text-slate-300 light:text-slate-700">{a.description}</p>
                </div>
              </div>
              {a.unlocked ? <Badge tone="success">Unlocked</Badge> : <Badge tone="warning">In progress</Badge>}
            </div>
            {!a.unlocked && typeof a.progress === 'number' ? (
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs text-slate-400 light:text-slate-600">
                  <span>Progress</span>
                  <span>{Math.round(a.progress * 100)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 light:bg-slate-900/5 light:ring-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300"
                    style={{ width: `${Math.round(a.progress * 100)}%` }}
                  />
                </div>
              </div>
            ) : null}
          </GlassPanel>
        )
      })}
    </div>
  )
}

export default function ParentDashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const hub = useApiQuery(() => medicalApi.getParentFamilyHubSnapshot('p1'), [])
  const speechWeekly = useApiQuery(() => speechApi.getWeeklyProgress(), [])

  const [messageId, setMessageId] = useState(null)

  const activeTab = getParentDashboardTab(location.pathname)

  const handleTabChange = useCallback(
    (id) => {
      navigate(parentDashboardPath(id), { replace: true })
    },
    [navigate],
  )

  useEffect(() => {
    document.title = 'LunaVoice · Family hub'
  }, [])

  useEffect(() => {
    if (isInvalidParentDashboardPath(location.pathname)) {
      navigate('/parent-dashboard', { replace: true })
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0)
  }, [activeTab])

  useEffect(() => {
    const first = hub.data?.messages?.[0]?.id
    if (first && messageId == null) setMessageId(first)
  }, [hub.data, messageId])

  const parentChildProfile = hub.data?.linkedProfile
  const parentAppointments = hub.data?.appointments ?? []
  const parentWeeklySummary = hub.data?.weeklySummary ?? { bullets: [] }
  const parentNotifications = hub.data?.notifications ?? []
  const parentMessages = hub.data?.messages ?? []
  const parentSessionHistory = hub.data?.sessionHistory ?? []
  const parentWeekStrip = hub.data?.weekStrip ?? []
  const parentCalendarAnchor = hub.data?.calendarAnchor ?? '2026-05-15'
  const therapistRecommendations = hub.data?.therapistRecommendations ?? []
  const parentRewards = hub.data?.rewards ?? []

  const minutesSeries = useMemo(() => {
    if (speechWeekly.data?.length && !speechWeekly.error) {
      return speechWeekly.data.map((w) => ({ week: w.week, minutes: w.practiceMin }))
    }
    return hub.data?.chartMinutes ?? []
  }, [speechWeekly.data, speechWeekly.error, hub.data])

  const pronunciationSeries = useMemo(() => {
    if (speechWeekly.data?.length && !speechWeekly.error) {
      return speechWeekly.data.map((w) => ({ week: w.week, pct: w.clarity }))
    }
    return hub.data?.chartPronunciation ?? []
  }, [speechWeekly.data, speechWeekly.error, hub.data])

  const activeMessage = useMemo(() => parentMessages.find((m) => m.id === messageId) ?? parentMessages[0], [messageId, parentMessages])

  const chartLoading = hub.loading || speechWeekly.loading

  return (
    <DashboardShell
      title="LunaVoice family hub"
      subtitle="Warm, clear visibility into your child’s speech journey."
      accent="teal"
      navItems={parentNavItems}
      tab={activeTab}
      onTabChange={handleTabChange}
    >
      {({ tab }) => {
        if (tab === 'book-appointment') {
          return <BookAppointmentTab />
        }

        if (tab === 'favorite-doctors') {
          return <FavoriteDoctorsTab />
        }

        if (tab === 'overview') {
          return (
            <div className="space-y-8">
              <ApiErrorBanner message={hub.error} onRetry={hub.refetch} />
              {speechWeekly.error ? <ApiErrorBanner message={speechWeekly.error} onRetry={speechWeekly.refetch} /> : null}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <GlassPanel className="lg:col-span-2" glow>
                  {hub.loading || !parentChildProfile ? (
                    <div className="h-48 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
                  ) : (
                    <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-x-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-200/90 light:text-teal-800">Child progress</p>
                        <p className="mt-2 text-2xl font-semibold tracking-tight text-white light:text-slate-900">{parentChildProfile.name}</p>
                        <p className="mt-1 text-sm text-slate-300 light:text-slate-700">Age {parentChildProfile.age} · Speech clarity program</p>
                        <div className="mt-5 flex flex-wrap items-end gap-4">
                          <div>
                            <p className="text-xs text-slate-400 light:text-slate-600">Improvement (12 weeks)</p>
                            <p className="mt-1 text-4xl font-semibold tracking-tight text-white light:text-slate-900">
                              +{parentChildProfile.improvementPct}%
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 light:border-slate-200 light:bg-white/80">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 light:text-slate-600">Trend</p>
                            <Sparkline values={parentChildProfile.sparkline} />
                          </div>
                        </div>
                      </div>
                      <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-slate-950/30 p-4 sm:w-64 light:border-slate-200 light:bg-white/70">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">
                          <CalendarDays className="h-4 w-4 text-teal-200 light:text-teal-700" />
                          Next appointment
                        </div>
                        {parentAppointments[0] ? (
                          <>
                            <p className="mt-3 text-sm font-semibold text-white light:text-slate-900">{parentAppointments[0].title}</p>
                            <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{formatDateTime(parentAppointments[0].when)}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge tone="info">{parentAppointments[0].mode}</Badge>
                              <Badge>{parentAppointments[0].provider}</Badge>
                            </div>
                          </>
                        ) : (
                          <p className="mt-3 text-sm text-slate-400">No upcoming visits in the mock feed.</p>
                        )}
                      </div>
                    </div>
                  )}
                </GlassPanel>

                <div className="space-y-4">
                  <StatCard
                    loading={chartLoading}
                    icon={TrendingUp}
                    label="Weekly practice minutes"
                    value={
                      minutesSeries.length ? `${minutesSeries[minutesSeries.length - 1]?.minutes}m` : '—'
                    }
                    delta="+9m vs prior week"
                    hint="Pulled from ASR coaching telemetry (mock)."
                  />
                  <GlassPanel>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">This week</p>
                    <div className="mt-3 flex justify-between gap-2">
                      {parentWeekStrip.map((d) => {
                        const isToday = d.date === parentCalendarAnchor
                        return (
                          <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                            <span className="text-[10px] font-medium text-slate-500 light:text-slate-600">{d.label}</span>
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold ${
                                isToday
                                  ? 'border-teal-400/40 bg-teal-500/15 text-teal-100'
                                  : 'border-white/10 bg-white/5 text-slate-200 light:border-slate-200 light:bg-white light:text-slate-800'
                              }`}
                            >
                              {d.date.slice(-2)}
                            </div>
                            <span className={`h-1.5 w-1.5 rounded-full ${d.hasSession ? 'bg-teal-300' : 'bg-slate-700'}`} />
                          </div>
                        )
                      })}
                    </div>
                  </GlassPanel>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <GlassPanel>
                  <SectionHeader eyebrow="Care team" title="Therapist recommendations" description="Actionable guidance synced from secure charting (mock)." />
                  <div className="mt-4 space-y-3">
                    {hub.loading
                      ? [1, 2].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />)
                      : therapistRecommendations.map((r) => (
                          <div key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/70">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-white light:text-slate-900">{r.headline}</p>
                              <Badge tone={r.priority === 'high' ? 'warning' : 'info'}>{r.priority}</Badge>
                            </div>
                            <p className="mt-2 text-xs text-slate-400 light:text-slate-600">
                              {r.author} · {r.role}
                            </p>
                            <p className="mt-2 text-sm text-slate-200 light:text-slate-800">{r.detail}</p>
                          </div>
                        ))}
                  </div>
                </GlassPanel>

                <GlassPanel>
                  <SectionHeader eyebrow="AI caregiver brief" title="Weekly summary" description="Plain-language highlights you can share with family." />
                  <ul className="mt-4 space-y-3">
                    {parentWeeklySummary.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 light:border-slate-200 light:bg-white/70 light:text-slate-800"
                      >
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal-200 light:text-teal-700" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <GlassPanel className="xl:col-span-2">
                  <SectionHeader title="Notifications" />
                  <div className="mt-4 space-y-3">
                    {parentNotifications.map((n) => (
                      <div key={n.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/70">
                        <p className="text-sm font-semibold text-white light:text-slate-900">{n.title}</p>
                        <p className="mt-1 text-sm text-slate-300 light:text-slate-700">{n.body}</p>
                        <p className="mt-2 text-xs text-slate-500 light:text-slate-600">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                <GlassPanel>
                  <SectionHeader title="AI speech pulse" description="Rolling clarity from the ASR coaching API (mock)." />
                  <div className="mt-4 space-y-3 text-sm text-slate-200 light:text-slate-800">
                    {speechWeekly.loading ? (
                      <div className="h-20 animate-pulse rounded-xl bg-white/5 light:bg-slate-100" />
                    ) : speechWeekly.data?.length ? (
                      speechWeekly.data.slice(-1).map((w) => (
                        <div key={w.week}>
                          <p className="text-xs uppercase tracking-wide text-slate-500">Latest week</p>
                          <p className="mt-2 text-2xl font-semibold text-white light:text-slate-900">{w.score}</p>
                          <p className="text-xs text-slate-400">Composite pronunciation index · {w.clarity}% clarity est.</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">Speech metrics will appear after the next practice session.</p>
                    )}
                  </div>
                </GlassPanel>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <ChartCard title="Practice minutes" subtitle="Rolling month (ASR-linked mock)" isLoading={chartLoading}>
                  {minutesSeries.length ? <MinutesBarChart data={minutesSeries} /> : <EmptyState title="No minutes yet" />}
                </ChartCard>
                <ChartCard title="Pronunciation clarity" subtitle="Weekly estimate" isLoading={chartLoading}>
                  {pronunciationSeries.length ? <PronunciationAreaChart data={pronunciationSeries} /> : <EmptyState title="No clarity series" />}
                </ChartCard>
              </div>

              <GlassPanel>
                <SectionHeader
                  title="Secure messages"
                  description="Encrypted threads with your child’s therapy team."
                  action={<Badge tone="info">Read-only demo</Badge>}
                />
                <div className="mt-4 grid gap-4 lg:grid-cols-5">
                  <div className="space-y-2 lg:col-span-2">
                    {parentMessages.map((m) => {
                      const active = m.id === messageId
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMessageId(m.id)}
                          className={cn(
                            'w-full rounded-2xl border px-4 py-3 text-left transition-colors',
                            active
                              ? 'border-teal-400/35 bg-teal-500/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10 light:border-slate-200 light:bg-white/80 light:hover:bg-white',
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-white light:text-slate-900">{m.from}</p>
                            {m.unread ? <span className="h-2 w-2 rounded-full bg-teal-300" /> : null}
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-slate-400 light:text-slate-600">{m.preview}</p>
                          <p className="mt-2 text-[11px] text-slate-500 light:text-slate-600">{formatDateTime(m.sentAt)}</p>
                        </button>
                      )
                    })}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5 lg:col-span-3 light:border-slate-200 light:bg-white/80">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">
                      <MessageCircle className="h-4 w-4 text-teal-200 light:text-teal-700" />
                      {activeMessage?.from} · {activeMessage?.role}
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200 light:text-slate-800">{activeMessage?.body}</p>
                  </div>
                </div>
              </GlassPanel>
            </div>
          )
        }

        if (tab === 'patients') {
          return (
            <div className="space-y-6">
              <SectionHeader title="Progress detail" description="Clinical gains translated into family-friendly milestones." />
              <div className="grid gap-4 lg:grid-cols-2">
                <ChartCard title="Practice minutes" subtitle="Month view" isLoading={chartLoading}>
                  {minutesSeries.length ? <MinutesBarChart data={minutesSeries} /> : <EmptyState title="No minutes yet" />}
                </ChartCard>
                <ChartCard title="Pronunciation clarity" subtitle="Estimated probe scores" isLoading={chartLoading}>
                  {pronunciationSeries.length ? <PronunciationAreaChart data={pronunciationSeries} /> : <EmptyState title="No clarity series" />}
                </ChartCard>
              </div>
            </div>
          )
        }

        if (tab === 'sessions') {
          return (
            <div className="space-y-4">
              <SectionHeader title="Session history" description="Recent visits and home-practice checkpoints." />
              <div className="space-y-3">
                {parentSessionHistory.map((h, idx) => (
                  <GlassPanel key={h.id} padding="p-4">
                    <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-4 lg:gap-y-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-teal-200 light:border-slate-200 light:bg-white light:text-teal-700">
                          <HeartHandshake className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white light:text-slate-900">{h.title}</p>
                          <p className="text-xs text-slate-400 light:text-slate-600">{formatShortDate(h.date)}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-3 lg:justify-end">
                        <Badge tone="success">{h.score}% session score</Badge>
                        <span className="text-xs text-slate-400 light:text-slate-600">{h.durationMin}m</span>
                        {idx === 0 ? <Badge tone="info">Latest</Badge> : null}
                      </div>
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </div>
          )
        }

        if (tab === 'records') {
          return (
            <div className="space-y-4">
              <ApiErrorBanner message={hub.error} onRetry={hub.refetch} />
              <SectionHeader title="Achievements & rewards" description="Celebrate consistency — motivation drives carryover." />
              <AchievementList rewards={parentRewards} loading={hub.loading} />
            </div>
          )
        }

        if (tab === 'notifications') {
          return (
            <div className="space-y-4">
              <SectionHeader title="Family updates" />
              <div className="grid gap-3">
                {parentNotifications.map((n) => (
                  <GlassPanel key={n.id} padding="p-4">
                    <p className="text-sm font-semibold text-white light:text-slate-900">{n.title}</p>
                    <p className="mt-1 text-sm text-slate-300 light:text-slate-700">{n.body}</p>
                    <p className="mt-2 text-xs text-slate-500 light:text-slate-600">{n.time}</p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          )
        }

        return (
          <EmptyState
            title="Section not found"
            description="Choose a section from the sidebar to continue."
          />
        )
      }}
    </DashboardShell>
  )
}
