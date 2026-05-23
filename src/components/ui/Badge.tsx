import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
  size?: 'sm' | 'md';
}

const palette: Record<string, { bg: string; color: string }> = {
  default: { bg: 'var(--bg-badge)', color: 'var(--text-secondary)' },
  success: { bg: '#d1fae5', color: '#065f46' },
  warning: { bg: '#fef3c7', color: '#92400e' },
  error: { bg: '#fce4ec', color: '#b71c1c' },
  info: { bg: '#dbeafe', color: '#1e40af' },
};

const darkPalette: Record<string, { bg: string; color: string }> = {
  default: { bg: 'var(--bg-badge)', color: 'var(--text-secondary)' },
  success: { bg: '#064e3b', color: '#6ee7b7' },
  warning: { bg: '#78350f', color: '#fcd34d' },
  error: { bg: '#4c0519', color: '#fda4af' },
  info: { bg: '#1e3a5f', color: '#93c5fd' },
};

export function Badge({ variant = 'default', children, size = 'md' }: BadgeProps) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const p = isDark ? darkPalette[variant] : palette[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        padding: size === 'sm' ? '2px var(--space-2)' : '3px var(--space-3)',
        borderRadius: 'var(--radius-full)',
        fontSize: size === 'sm' ? 'var(--text-xs)' : 'var(--text-xs)',
        fontWeight: 500,
        background: p.bg,
        color: p.color,
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}
