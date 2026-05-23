import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NotificationToast } from '../ui/Notification';

export function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column', transition: 'margin-left var(--transition-slow)' }} className="main-content">
        <Header />
        <main style={{ flex: 1, padding: 'var(--space-6)', marginTop: 'var(--header-height)', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
      <NotificationToast />
    </div>
  );
}
