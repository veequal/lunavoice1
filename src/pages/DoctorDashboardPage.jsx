import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  Bell,
  Brain,
  Lock,
  Search,
  Shield,
  TrendingUp,
  UploadCloud,
  Users,
} from 'lucide-react'
import { DashboardShell } from '../components/layout/DashboardShell.jsx'
import { StatCard } from '../components/ui/StatCard.jsx'
import { SectionHeader } from '../components/ui/SectionHeader.jsx'
import { GlassPanel } from '../components/ui/GlassPanel.jsx'
import { GlowButton } from '../components/ui/GlowButton.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ApiErrorBanner } from '../components/ui/ApiErrorBanner.jsx'
import { DataTableLite, PatientStatusChip, SessionStatusBadge } from '../components/ui/DataTableLite.jsx'
import { ChartCard } from '../components/charts/ChartCard.jsx'
import { WeeklyProgressChart } from '../components/charts/WeeklyProgressChart.jsx'
import { AccuracyTrendChart } from '../components/charts/AccuracyTrendChart.jsx'
import * as medicalApi from '../services/medicalApi.js'
import { useApiQuery } from '../hooks/useApiQuery.js'
import { formatDateTime, formatShortDate } from '../lib/format.js'

function ConfidenceMeter({ value }) {
  const pct = Math.round(value * 100)
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400 light:text-slate-600">
        <span>Model confidence</span>
        <span className="font-medium text-slate-200 light:text-slate-800">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 light:bg-slate-900/5 light:ring-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function DoctorDashboardPage() {
  const workspace = useApiQuery(() => medicalApi.getClinicianWorkspaceSnapshot(), [])
  const patientsQ = useApiQuery(() => medicalApi.getPatients(), [])
  const recordsQ = useApiQuery(() => medicalApi.getSecureDocuments(), [])
  const [query, setQuery] = useState('')
  const [uploadBusy, setUploadBusy] = useState(false)
  const [localUploads, setLocalUploads] = useState([])

  useEffect(() => {
    document.title = 'LunaVoice · Clinician workspace'
  }, [])

  const analytics = workspace.data?.analytics
  const summaries = workspace.data?.summaries ?? []
  const doctorNotifications = workspace.data?.notifications ?? []
  const therapySessions = workspace.data?.therapySessions ?? []
  const patients = patientsQ.data ?? []
  const secureDocuments = useMemo(
    () => [...(recordsQ.data ?? []), ...localUploads],
    [recordsQ.data, localUploads],
  )

  const filteredPatients = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) => {
      const hay = `${p.name} ${p.mrn} ${p.tags.join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [patients, query])

  const sessionColumns = useMemo(
    () => [
      { key: 'patientName', label: 'Patient' },
      { key: 'date', label: 'When', render: (r) => formatDateTime(r.date) },
      { key: 'type', label: 'Mode' },
      { key: 'durationMin', label: 'Duration', render: (r) => `${r.durationMin}m` },
      { key: 'status', label: 'Status', render: (r) => <SessionStatusBadge status={r.status} /> },
    ],
    [],
  )

  const overviewBusy = workspace.loading
  const topError = workspace.error || patientsQ.error || recordsQ.error

  async function simulateUpload() {
    setUploadBusy(true)
    const res = await medicalApi.uploadRecord({
      fileName: `intake_${new Date().toISOString().slice(0, 10)}.pdf`,
      patientId: 'p1',
      kind: 'consent',
    })
    setUploadBusy(false)
    if (res.ok && res.data) {
      setLocalUploads((prev) => [
        ...prev,
        {
          id: res.data.id,
          patientId: res.data.patientId ?? 'p1',
          label: res.data.fileName,
          uploadedAt: res.data.receivedAt,
          ocrStatus: res.data.ocrStatus,
          aiExtractConfidence: null,
          storageTier: 'HIPAA-ready vault (mock)',
        },
      ])
    }
  }

  return (
    <DashboardShell
      title="LunaVoice clinician workspace"
      subtitle="Population insights, AI-assisted documentation, and session intelligence for your practice."
      accent="indigo"
    >
      {({ tab }) => {
        if (tab === 'overview') {
          return (
            <div className="space-y-8">
              <ApiErrorBanner message={workspace.error} onRetry={workspace.refetch} />
              {patientsQ.error ? <ApiErrorBanner message={patientsQ.error} onRetry={patientsQ.refetch} /> : null}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {(analytics?.kpis ?? []).map((kpi) => (
                  <StatCard
                    key={kpi.id}
                    loading={overviewBusy}
                    label={kpi.label}
                    value={topError && !overviewBusy ? '—' : kpi.value}
                    delta={kpi.delta}
                    hint={kpi.hint}
                    icon={
                      kpi.id === 'active'
                        ? Users
                        : kpi.id === 'accuracy'
                          ? Activity
                          : kpi.id === 'ai'
                            ? Brain
                            : TrendingUp
                    }
                  />
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <ChartCard title="Weekly cohort improvement" subtitle="Composite clarity score (rolling)" isLoading={overviewBusy} className="xl:col-span-2">
                  {analytics?.weeklyImprovementSeries?.length ? <WeeklyProgressChart data={analytics.weeklyImprovementSeries} /> : <EmptyState title="No chart data" />}
                </ChartCard>
                <ChartCard title="Therapy accuracy trend" subtitle="Last 7 days (clinic aggregate)" isLoading={overviewBusy}>
                  {analytics?.accuracyTrendSeries?.length ? <AccuracyTrendChart data={analytics.accuracyTrendSeries} /> : <EmptyState title="No chart data" />}
                </ChartCard>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <GlassPanel>
                  <SectionHeader
                    eyebrow="AI documentation"
                    title="Patient summaries"
                    description="Concise, clinician-verified drafts generated from session signals."
                  />
                  <div className="mt-5 space-y-4">
                    {overviewBusy
                      ? [1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />)
                      : summaries.map((s) => (
                          <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/70">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-white light:text-slate-900">{s.name}</p>
                                <p className="text-xs text-slate-400 light:text-slate-600">{new Date(s.updatedAt).toLocaleString()}</p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {s.tags.map((t) => (
                                  <Badge key={t} tone="info">
                                    {t}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-slate-200 light:text-slate-800">{s.summary}</p>
                            <div className="mt-4">
                              <ConfidenceMeter value={s.confidence} />
                            </div>
                          </div>
                        ))}
                  </div>
                </GlassPanel>

                <GlassPanel>
                  <SectionHeader
                    eyebrow="Operations"
                    title="Notifications"
                    description="Stay ahead of documentation, signatures, and care coordination."
                  />
                  <div className="mt-5 space-y-3">
                    {overviewBusy
                      ? [1, 2, 3].map((i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />)
                      : doctorNotifications.map((n) => (
                          <div
                            key={n.id}
                            className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/70"
                          >
                            <div>
                              <p className="text-sm font-semibold text-white light:text-slate-900">{n.title}</p>
                              <p className="mt-1 text-sm text-slate-300 light:text-slate-700">{n.body}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-xs text-slate-400 light:text-slate-600">{n.time}</p>
                              {n.unread ? <span className="mt-2 inline-block h-2 w-2 rounded-full bg-indigo-400" /> : null}
                            </div>
                          </div>
                        ))}
                  </div>
                </GlassPanel>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <GlassPanel>
                  <SectionHeader title="Active patient spotlight" description="Highest engagement + strongest weekly lift." />
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {patientsQ.loading
                      ? [1, 2].map((i) => <div key={i} className="h-36 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />)
                      : patients.slice(0, 2).map((p) => (
                          <div key={p.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 light:border-slate-200 light:bg-white/70">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-white light:text-slate-900">{p.name}</p>
                                <p className="text-xs text-slate-400 light:text-slate-600">{p.mrn}</p>
                              </div>
                              <PatientStatusChip status={p.status} attention={p.attention} />
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {p.tags.map((t) => (
                                <Badge key={t}>{t}</Badge>
                              ))}
                            </div>
                            <p className="mt-3 text-xs text-slate-400 light:text-slate-600">Last session {formatShortDate(p.lastSession)}</p>
                          </div>
                        ))}
                  </div>
                </GlassPanel>

                <GlassPanel>
                  <SectionHeader title="Recent therapy sessions" description="Operational snapshot across your caseload." />
                  <div className="mt-4">
                    <DataTableLite
                      rows={therapySessions.slice(0, 4)}
                      columns={sessionColumns}
                      empty={<EmptyState title={overviewBusy ? 'Loading sessions…' : 'No sessions'} />}
                    />
                  </div>
                </GlassPanel>
              </div>
            </div>
          )
        }

        if (tab === 'patients') {
          return (
            <div className="space-y-6">
              <ApiErrorBanner message={patientsQ.error} onRetry={patientsQ.refetch} />
              <SectionHeader
                title="Patients"
                description="Search by name, MRN, or clinical tags."
                action={
                  <div className="relative w-full sm:w-80">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search patients…"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none ring-indigo-400/0 transition focus:ring-2 light:border-slate-200 light:bg-white light:text-slate-900"
                    />
                  </div>
                }
              />

              {patientsQ.loading ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/5 light:bg-slate-100" />
                  ))}
                </div>
              ) : filteredPatients.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPatients.map((p) => (
                    <GlassPanel key={p.id} glow padding="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/15 text-sm font-semibold text-white">
                            {p.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white light:text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-400 light:text-slate-600">
                              Age {p.age} · {p.mrn}
                            </p>
                          </div>
                        </div>
                        <PatientStatusChip status={p.status} attention={p.attention} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs light:border-slate-200">
                        <div>
                          <p className="text-slate-500 light:text-slate-600">Accuracy</p>
                          <p className="mt-1 font-semibold text-slate-100 light:text-slate-900">{Math.round(p.accuracy * 100)}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500 light:text-slate-600">Weekly</p>
                          <p className="mt-1 font-semibold text-emerald-200 light:text-emerald-700">{p.weeklyDelta}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 light:text-slate-600">Last visit</p>
                          <p className="mt-1 font-semibold text-slate-100 light:text-slate-900">{formatShortDate(p.lastSession)}</p>
                        </div>
                      </div>
                    </GlassPanel>
                  ))}
                </div>
              ) : (
                <EmptyState title="No patients match your search" description="Try a different name, MRN, or tag keyword." icon={Search} />
              )}
            </div>
          )
        }

        if (tab === 'sessions') {
          return (
            <div className="space-y-4">
              <ApiErrorBanner message={workspace.error} onRetry={workspace.refetch} />
              <SectionHeader title="Therapy sessions" description="Operational statuses across telehealth and in-person care." />
              {workspace.loading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5 light:bg-slate-100" />
                  ))}
                </div>
              ) : (
                <DataTableLite rows={therapySessions} columns={sessionColumns} empty={<EmptyState title="No sessions" />} />
              )}
            </div>
          )
        }

        if (tab === 'records') {
          return (
            <div className="space-y-4">
              <ApiErrorBanner message={recordsQ.error} onRetry={recordsQ.refetch} />
              <SectionHeader
                title="Secure medical records"
                description="Simulated OCR intake queue — enterprise storage hooks in later."
                action={
                  <GlowButton type="button" onClick={simulateUpload} disabled={uploadBusy} className="gap-2">
                    <UploadCloud className="h-4 w-4" />
                    {uploadBusy ? 'Uploading…' : 'Simulate upload'}
                  </GlowButton>
                }
              />
              <GlassPanel className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/20 via-slate-950/60 to-slate-950/85 backdrop-blur-sm light:from-white/10 light:via-white/40 light:to-white/75" />
                <div className="relative flex flex-col items-start gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 light:border-slate-200 light:bg-white">
                      <Lock className="h-5 w-5 text-indigo-200 light:text-indigo-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white light:text-slate-900">Protected health information</p>
                      <p className="mt-1 max-w-prose text-sm text-slate-300 light:text-slate-700">
                        Charts route through the Secure Medical Records API mock. Live PHI stays encrypted in your future backend vault.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm light:border-slate-200 light:bg-white/70">
                  {recordsQ.loading ? (
                    [1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-white/5 light:bg-slate-100" />)
                  ) : (
                    secureDocuments.map((d) => (
                      <div
                        key={d.id}
                        className="flex min-w-0 flex-col justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/25 p-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-4 light:border-slate-200 light:bg-white/80"
                      >
                        <div>
                          <p className="font-medium text-white light:text-slate-900">{d.label}</p>
                          <p className="text-xs text-slate-400 light:text-slate-600">Uploaded {formatDateTime(d.uploadedAt)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge tone="info">OCR: {d.ocrStatus}</Badge>
                          {typeof d.aiExtractConfidence === 'number' ? (
                            <Badge tone="success">AI {Math.round(d.aiExtractConfidence * 100)}%</Badge>
                          ) : (
                            <Badge>AI pending</Badge>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 light:border-slate-200 light:bg-white/70 light:text-slate-700">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400 light:text-slate-600">
                    <Shield className="h-4 w-4" />
                    Audit-ready access model
                  </div>
                  <p className="mt-2 text-sm">
                    Role-based permissions, break-glass workflows, and immutable access logs ship in the enterprise tier.
                  </p>
                </div>
              </GlassPanel>
            </div>
          )
        }

        if (tab === 'notifications') {
          return (
            <div className="space-y-4">
              <ApiErrorBanner message={workspace.error} onRetry={workspace.refetch} />
              <SectionHeader title="Inbox" description="Operational alerts across your practice." />
              <div className="grid gap-3">
                {workspace.loading
                  ? [1, 2, 3].map((i) => (
                      <GlassPanel key={i} padding="p-4">
                        <div className="h-16 animate-pulse rounded-xl bg-white/5 light:bg-slate-100" />
                      </GlassPanel>
                    ))
                  : doctorNotifications.map((n) => (
                      <GlassPanel key={n.id} padding="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 light:border-slate-200 light:bg-white">
                              <Bell className="h-5 w-5 text-indigo-200 light:text-indigo-700" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white light:text-slate-900">{n.title}</p>
                              <p className="mt-1 text-sm text-slate-300 light:text-slate-700">{n.body}</p>
                            </div>
                          </div>
                          <p className="shrink-0 text-xs text-slate-400 light:text-slate-600">{n.time}</p>
                        </div>
                      </GlassPanel>
                    ))}
              </div>
            </div>
          )
        }

        return null
      }}
    </DashboardShell>
  )
}
