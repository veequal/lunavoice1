import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.92)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

export function PronunciationAreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="vhPct" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 'auto']} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Clarity']} />
        <Area type="monotone" dataKey="pct" stroke="#34d399" strokeWidth={2} fill="url(#vhPct)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
