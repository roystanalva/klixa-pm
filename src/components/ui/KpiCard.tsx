import { DollarSign, ShoppingCart, Package, Users, ClipboardCheck, TrendingUp, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  DollarSign, ShoppingCart, Package, Users, ClipboardCheck, TrendingUp,
};

interface KpiCardProps {
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon: string;
}

export function KpiCard({ label, value, trend, trendLabel, icon }: KpiCardProps) {
  const Icon = iconMap[icon] || TrendingUp;
  const isPositive = trend >= 0;

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)', animation: 'slideUp 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
        <div style={{ padding: 8, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} />
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 'var(--text-xs)', fontWeight: 500, color: isPositive ? 'var(--color-success)' : 'var(--color-error)' }}>
          <span>{isPositive ? '↑' : '↓'}</span>
          {Math.abs(trend)}%
        </span>
      </div>
      <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>{value}</div>
      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{label}</div>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{trendLabel}</div>
    </div>
  );
}
