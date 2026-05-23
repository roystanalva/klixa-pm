export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department: string;
  joinedAt: string;
}

export type UserRole = 'executive' | 'finance' | 'procurement' | 'inventory' | 'sales' | 'hr' | 'admin';

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  assignee: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  target: string;
  time: string;
  type: 'create' | 'update' | 'approve' | 'reject' | 'comment';
}

export interface FinanceRecord {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'revenue' | 'expense';
  status: 'posted' | 'pending' | 'reconciled';
  department: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  items: string;
  total: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
  deliveryDate: string;
  department: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unit: string;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstocked';
  lastUpdated: string;
  price: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentStatus: 'paid' | 'partial' | 'unpaid' | 'refunded';
  salesRep: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'on_leave' | 'terminated';
  hireDate: string;
  salary: number;
  location: string;
  manager: string;
  phone: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'purchase_order' | 'expense' | 'leave' | 'contract' | 'invoice';
  title: string;
  requester: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'more_info';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedAt: string;
  dueDate: string;
  department: string;
  description: string;
}

export interface ModulePermission {
  module: string;
  roles: UserRole[];
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}
