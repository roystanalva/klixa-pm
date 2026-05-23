import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sun, Moon, LogOut, Settings, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Avatar } from '../ui/Avatar';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, right: 0, left: 'var(--sidebar-width)', height: 'var(--header-height)', background: 'var(--bg-header)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-6)', zIndex: 90, transition: 'left var(--transition-slow)' }} className="app-header">
      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 400, width: '100%' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Search modules, records, people..."
          style={{ width: '100%', height: 38, padding: '0 var(--space-3) 0 36px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', outline: 'none' }}
        />
        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', background: 'var(--bg-badge)', padding: '1px 6px', borderRadius: 'var(--radius-sm)' }}>⌘K</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} style={{ padding: 8, borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button onClick={() => setShowNotifications(s => !s)} style={{ position: 'relative', padding: 8, borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <Bell size={18} />
            {unreadCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--color-error)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 360, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', maxHeight: 400, overflowY: 'auto', animation: 'fadeIn 0.15s ease' }}>
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>Notifications</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{unreadCount} unread</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-light)', background: n.read ? 'transparent' : 'var(--color-primary-50)', cursor: 'pointer' }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: n.read ? 400 : 600, color: 'var(--text-primary)' }}>{n.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{n.message}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button onClick={() => setShowProfile(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
            <Avatar name={user?.name ?? ''} size={32} />
            <div style={{ textAlign: 'left', display: 'none' }} className="profile-name">
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{user?.email}</div>
            </div>
          </button>

          {showProfile && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 220, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', animation: 'fadeIn 0.15s ease' }}>
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{user?.email}</div>
              </div>
              <button onClick={() => { navigate('/admin'); setShowProfile(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <Settings size={16} /> Settings
              </button>
              <button onClick={() => logout()} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-error)', cursor: 'pointer', borderTop: '1px solid var(--border-color)' }}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
