import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = { sm: 'var(--space-3)', md: 'var(--space-5)', lg: 'var(--space-6)' };

export function Card({ children, padding = 'md', hover, style, ...props }: CardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: paddings[padding],
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-base)',
        cursor: hover ? 'pointer' : undefined,
        ...(hover ? { ':hover': { boxShadow: 'var(--shadow-md)', borderColor: 'var(--color-primary-200)' } } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
