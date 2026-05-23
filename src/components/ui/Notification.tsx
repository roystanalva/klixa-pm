import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const iconMap = { info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle };
const colorMap = { info: 'var(--color-info)', success: 'var(--color-success)', warning: 'var(--color-warning)', error: 'var(--color-error)' };

export function NotificationToast() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const latest = notifications.filter(n => !n.read).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 'calc(var(--header-height) + 8px)', right: 16, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 380 }}>
      {latest.map(n => {
        const Icon = iconMap[n.type];
        return (
          <div key={n.id} style={{ display: 'flex', gap: 12, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: 'var(--shadow-lg)', animation: 'slideInRight 0.3s ease', cursor: 'pointer' }} onClick={() => markAsRead(n.id)}>
            <div style={{ flexShrink: 0, color: colorMap[n.type], marginTop: 2 }}><Icon size={18} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{n.message}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>{n.time}</div>
            </div>
          </div>
        );
      })}
      {notifications.filter(n => !n.read).length > 3 && (
        <button onClick={clearNotifications} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-link)', textAlign: 'center', padding: 'var(--space-2)' }}>Clear all</button>
      )}
    </div>
  );
}
