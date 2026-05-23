import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartDataPoint } from '../../types';

interface PieChartProps {
  data: ChartDataPoint[];
  height?: number;
  colors?: string[];
}

const defaultColors = ['var(--color-primary-500)', 'var(--color-accent-500)', 'var(--color-success)', 'var(--color-warning)', 'var(--color-error)'];

export function PieChart({ data, height = 280, colors = defaultColors }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPie>
        <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
          {data.map((_, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, boxShadow: 'var(--shadow-md)' }}
          labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
        />
        <Legend
          verticalAlign="bottom"
          formatter={(value: string) => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{value}</span>}
        />
      </RechartsPie>
    </ResponsiveContainer>
  );
}
