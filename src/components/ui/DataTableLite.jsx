import { Badge } from './Badge.jsx'

export function DataTableLite({ rows, columns, empty }) {
  if (!rows?.length) return empty

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 light:border-slate-200 light:bg-white/60">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wide text-slate-400 light:border-slate-200 light:bg-slate-900/5 light:text-slate-600">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 light:divide-slate-200">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 light:hover:bg-slate-900/5">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-slate-200 light:text-slate-800">
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-white/10 lg:hidden light:divide-slate-200">
        {rows.map((row) => (
          <div key={row.id} className="space-y-2 p-4">
            {columns.map((c) => (
              <div key={c.key} className="flex items-start justify-between gap-3">
                <span className="text-xs text-slate-500 light:text-slate-600">{c.label}</span>
                <div className="text-right text-sm text-slate-100 light:text-slate-900">
                  {c.render ? c.render(row) : row[c.key]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SessionStatusBadge({ status }) {
  const map = {
    completed: { tone: 'success', label: 'Completed' },
    note_pending: { tone: 'warning', label: 'Note pending' },
    cancelled: { tone: 'danger', label: 'Cancelled' },
  }
  const m = map[status] ?? { tone: 'default', label: status }
  return <Badge tone={m.tone}>{m.label}</Badge>
}

export function PatientStatusChip({ status, attention }) {
  if (attention) return <Badge tone="warning">Needs attention</Badge>
  if (status === 'on_track') return <Badge tone="success">On track</Badge>
  return <Badge tone="warning">Watch</Badge>
}
