import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
      <div style={{ padding: 12, borderRadius: 'var(--radius-full)', background: 'var(--bg-badge)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
        <Inbox size={32} />
      </div>
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 var(--space-2)' }}>{title}</h3>
      {description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 360 }}>{description}</p>}
      {action && <div style={{ marginTop: 'var(--space-4)' }}>{action}</div>}
    </div>
  );
}
