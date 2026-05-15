import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.92)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

export function MinutesBarChart({ data, dataKey = 'minutes', label = 'Minutes' }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}`, label]} />
        <Bar dataKey={dataKey} fill="#2dd4bf" radius={[10, 10, 0, 0]} opacity={0.9} />
      </BarChart>
    </ResponsiveContainer>
  )
}
