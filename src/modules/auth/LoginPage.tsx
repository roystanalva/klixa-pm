import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter credentials'); return; }
    const success = login(email, password);
    if (!success) setError('Invalid credentials');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-body)' }}>
      {/* Left - Brand */}
      <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 'var(--space-12)', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', display: 'none' }} className="login-brand">
        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>N</span>
        </div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: '#fff', margin: '0 0 var(--space-3)', letterSpacing: '-0.02em' }}>Nexus ERP</h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.6)', maxWidth: 420, lineHeight: 1.6 }}>
          Enterprise resource planning platform built for scale, speed, and collaboration.
        </p>
      </div>

      {/* Right - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>N</span>
            </div>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Welcome back</h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>Sign in to your Nexus ERP account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input label="Email" type="email" placeholder="alex.morgan@nexuscorp.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail size={16} />} />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} icon={<Lock size={16} />} />
            {error && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>{error}</span>}
            <Button type="submit" size="lg" style={{ width: '100%', marginTop: 'var(--space-2)' }} icon={<ArrowRight size={16} />}>
              Sign in
            </Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-6)' }}>
            Secured with SSO · Contact IT for access
          </p>
        </div>
      </div>
    </div>
  );
}
