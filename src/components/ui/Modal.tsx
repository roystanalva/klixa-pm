import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

export function Modal({ open, onClose, title, children, width = '520px' }: ModalProps) {
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
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}
      onClick={onClose}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-overlay)' }} />
      <div
        style={{ position: 'relative', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: width, maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xl)', animation: 'scaleIn 0.2s ease' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-color)' }}>
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
