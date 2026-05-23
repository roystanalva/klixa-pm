import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';

interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
}

export function BarChart({ data, height = 300, color = 'var(--color-primary-500)' }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, boxShadow: 'var(--shadow-md)' }}
          labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={40} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}

interface ComposedBarChartProps {
  data: ChartDataPoint[];
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export function ComposedBarChart({ data, height = 300, primaryColor = 'var(--color-primary-500)', secondaryColor = 'var(--color-accent-500)' }: ComposedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, boxShadow: 'var(--shadow-md)' }}
          labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
        />
        <Bar dataKey="value" fill={primaryColor} radius={[4, 4, 0, 0]} maxBarSize={30} />
        <Bar dataKey="secondary" fill={secondaryColor} radius={[4, 4, 0, 0]} maxBarSize={30} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
