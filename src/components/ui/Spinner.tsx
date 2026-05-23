interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 24, color = 'var(--color-primary-500)' }: SpinnerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
      <div style={{ width: size, height: size, border: `3px solid var(--border-color)`, borderTopColor: color, borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
    </div>
  );
}
