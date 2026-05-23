import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-2)',
  fontWeight: 500,
  borderRadius: 'var(--radius-md)',
  transition: 'all var(--transition-fast)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
};

const variants: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--color-primary-600)', color: '#fff', border: '2px solid transparent' },
  secondary: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' },
  danger: { background: 'var(--color-error)', color: '#fff', border: '2px solid transparent' },
  ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '2px solid transparent' },
  outline: { background: 'transparent', color: 'var(--color-primary-600)', border: '2px solid var(--color-primary-600)' },
};

const sizes: Record<string, React.CSSProperties> = {
  sm: { height: '32px', padding: '0 var(--space-3)', fontSize: 'var(--text-xs)' },
  md: { height: '38px', padding: '0 var(--space-4)', fontSize: 'var(--text-sm)' },
  lg: { height: '44px', padding: '0 var(--space-6)', fontSize: 'var(--text-base)' },
};

export function Button({ variant = 'primary', size = 'md', loading, icon, children, style, disabled, ...props }: ButtonProps) {
  const hoverStyle: React.CSSProperties = variant === 'primary' ? { background: 'var(--color-primary-700)' }
    : variant === 'danger' ? { background: '#dc2626' }
    : variant === 'ghost' ? { background: 'var(--bg-surface-hover)' }
    : {};

  return (
    <button
      style={{ ...base, ...variants[variant], ...sizes[size], opacity: disabled || loading ? 0.6 : 1, cursor: disabled || loading ? 'not-allowed' : 'pointer', ...style }}
      onMouseEnter={e => { if (!disabled && !loading) Object.assign(e.currentTarget.style, hoverStyle); }}
      onMouseLeave={e => { if (!disabled) Object.assign(e.currentTarget.style, variants[variant]); }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />}
      {!loading && icon}
      {children}
    </button>
  );
}
