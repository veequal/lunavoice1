import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.92)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

export function AccuracyTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[85, 'auto']} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Accuracy']} />
        <Line type="monotone" dataKey="accuracy" stroke="#22d3ee" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
