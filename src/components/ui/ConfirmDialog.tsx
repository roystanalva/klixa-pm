import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'primary';
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', variant = 'danger' }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} width="400px">
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--color-warning)', marginBottom: 'var(--space-4)' }}><AlertTriangle size={48} /></div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant={variant} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button>
        </div>
      </div>
    </Modal>
  );
}
