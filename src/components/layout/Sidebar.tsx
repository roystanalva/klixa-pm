import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Wallet, ShoppingCart, Package, Receipt, Users, BarChart3, ClipboardCheck, Settings, ChevronLeft, Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../ui/Avatar';

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Finance', path: '/finance', icon: Wallet },
  { label: 'Procurement', path: '/procurement', icon: ShoppingCart },
  { label: 'Inventory', path: '/inventory', icon: Package },
  { label: 'Sales', path: '/sales', icon: Receipt },
  { label: 'HR', path: '/hr', icon: Users },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Approvals', path: '/approvals', icon: ClipboardCheck, badge: 4 },
  { label: 'Settings', path: '/admin', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const nav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: collapsed ? 'var(--space-4) var(--space-3)' : 'var(--space-5) var(--space-5)', borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 64 }}>
        <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>N</span>
        </div>
        {!collapsed && <span style={{ color: '#fff', fontWeight: 700, fontSize: 'var(--text-lg)', letterSpacing: '-0.02em' }}>Nexus ERP</span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: collapsed ? 'var(--space-3) var(--space-2)' : 'var(--space-3) var(--space-3)', overflowY: 'auto' }}>
        {navItems.map(item => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => nav(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: collapsed ? 'var(--space-3) 0' : 'var(--space-2) var(--space-3)',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--radius-md)',
                background: active ? 'rgba(79, 110, 247, 0.15)' : 'transparent',
                color: active ? 'var(--color-primary-400)' : 'rgba(255,255,255,0.6)',
                fontSize: 'var(--text-sm)',
                fontWeight: active ? 600 : 400,
                transition: 'all var(--transition-fast)',
                position: 'relative',
                cursor: 'pointer',
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
              {item.badge && !collapsed && (
                <span style={{ background: 'var(--color-error)', color: '#fff', borderRadius: 'var(--radius-full)', padding: '1px 6px', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{item.badge}</span>
              )}
              {item.badge && collapsed && (
                <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: 'var(--color-error)' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && user && (
        <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={user.name} size={32} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff' }}>{user.name}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)' }}>{user.role}</div>
          </div>
        </div>
      )}

      {/* Collapse */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{ display: 'none', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-3)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color var(--transition-fast)' }}
        className="sidebar-collapse-btn"
      >
        <ChevronLeft size={18} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-base)' }} />
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(o => !o)}
        style={{ position: 'fixed', top: 14, left: 12, zIndex: 1100, padding: 6, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', display: 'none', cursor: 'pointer' }}
        className="mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 1040, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />}

      {/* Mobile sidebar */}
      <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 1050, width: 260, background: 'var(--bg-sidebar)', transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease', display: 'none' }} className="mobile-sidebar">
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)', background: 'var(--bg-sidebar)', transition: 'width var(--transition-slow)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="desktop-sidebar">
        {sidebarContent}
      </aside>
    </>
  );
}
