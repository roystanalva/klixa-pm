import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

export function Drawer({ open, onClose, title, children, width = '480px' }: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handler);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
    }
    document.body.style.overflow = '';
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-overlay)' }} />
      <div
        style={{ position: 'relative', marginLeft: 'auto', background: 'var(--bg-card)', width: '100%', maxWidth: width, height: '100vh', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xl)', animation: 'slideInRight 0.25s ease' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 'var(--radius-sm)', color: 'var(--text-tertiary)' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: 'var(--space-6)', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
