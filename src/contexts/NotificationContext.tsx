import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { NotificationItem } from '../types';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (n: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
});

const initialNotifications: NotificationItem[] = [
  { id: 'not-1', type: 'info', title: 'PO #PO-2024-089 approved', message: 'Your purchase order has been approved by Finance.', time: '2 min ago', read: false },
  { id: 'not-2', type: 'warning', title: 'Inventory low: Widget A', message: 'Stock level for Widget A is below minimum threshold.', time: '15 min ago', read: false },
  { id: 'not-3', type: 'success', title: 'Sales target achieved', message: 'Q4 sales target has been exceeded by 12%.', time: '1 hour ago', read: false },
  { id: 'not-4', type: 'info', title: 'New employee onboarding', message: 'Sarah Chen has been scheduled for next week.', time: '3 hours ago', read: true },
  { id: 'not-5', type: 'error', title: 'Payment gateway error', message: 'Transaction #TX-3948 failed due to timeout.', time: '5 hours ago', read: true },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((n: Omit<NotificationItem, 'id' | 'time' | 'read'>) => {
    const newNot: NotificationItem = {
      ...n,
      id: `not-${Date.now()}`,
      time: 'just now',
      read: false,
    };
    setNotifications(prev => [newNot, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
