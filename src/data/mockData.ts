import type {
  KpiMetric, Task, Activity, FinanceRecord, PurchaseOrder,
  InventoryItem, SalesOrder, Employee, ApprovalRequest, AuditLog, TeamMember
} from '../types';

export const kpiMetrics: KpiMetric[] = [
  { id: 'kpi-1', label: 'Total Revenue', value: '$12.4M', trend: 12.5, trendLabel: 'vs last quarter', icon: 'DollarSign' },
  { id: 'kpi-2', label: 'Active Orders', value: '847', trend: -3.2, trendLabel: 'vs last month', icon: 'ShoppingCart' },
  { id: 'kpi-3', label: 'Inventory Value', value: '$3.2M', trend: 5.1, trendLabel: 'vs last quarter', icon: 'Package' },
  { id: 'kpi-4', label: 'Employees', value: '1,284', trend: 2.4, trendLabel: 'vs last quarter', icon: 'Users' },
  { id: 'kpi-5', label: 'Pending Approvals', value: '23', trend: -8.7, trendLabel: 'vs last week', icon: 'ClipboardCheck' },
  { id: 'kpi-6', label: 'Avg. Order Value', value: '$4,280', trend: 7.3, trendLabel: 'vs last month', icon: 'TrendingUp' },
];

export const revenueData = [
  { label: 'Jan', value: 980, secondary: 820 },
  { label: 'Feb', value: 1100, secondary: 900 },
  { label: 'Mar', value: 1250, secondary: 950 },
  { label: 'Apr', value: 1180, secondary: 1020 },
  { label: 'May', value: 1420, secondary: 1100 },
  { label: 'Jun', value: 1380, secondary: 1150 },
  { label: 'Jul', value: 1510, secondary: 1200 },
  { label: 'Aug', value: 1620, secondary: 1250 },
  { label: 'Sep', value: 1580, secondary: 1300 },
  { label: 'Oct', value: 1720, secondary: 1350 },
  { label: 'Nov', value: 1850, secondary: 1400 },
  { label: 'Dec', value: 1920, secondary: 1450 },
];

export const departmentRevenue = [
  { label: 'North America', value: 45 },
  { label: 'Europe', value: 28 },
  { label: 'Asia Pacific', value: 18 },
  { label: 'Latin America', value: 9 },
];

export const tasks: Task[] = [
  { id: 't-1', title: 'Review Q4 budget proposals', priority: 'high', status: 'in_progress', dueDate: '2026-05-25', assignee: 'Alex Morgan' },
  { id: 't-2', title: 'Approve pending purchase orders', priority: 'critical', status: 'pending', dueDate: '2026-05-22', assignee: 'Alex Morgan' },
  { id: 't-3', title: 'Finalize quarterly report', priority: 'high', status: 'in_progress', dueDate: '2026-05-28', assignee: 'Jordan Lee' },
  { id: 't-4', title: 'Vendor contract renewal - TechSupply', priority: 'medium', status: 'pending', dueDate: '2026-06-01', assignee: 'Morgan Chen' },
  { id: 't-5', title: 'Employee satisfaction survey', priority: 'low', status: 'completed', dueDate: '2026-05-15', assignee: 'Riley Patel' },
  { id: 't-6', title: 'Inventory audit - Warehouse B', priority: 'medium', status: 'in_progress', dueDate: '2026-05-30', assignee: 'Sam Torres' },
  { id: 't-7', title: 'Update security protocols', priority: 'critical', status: 'pending', dueDate: '2026-05-20', assignee: 'Alex Morgan' },
];

export const activities: Activity[] = [
  { id: 'a-1', action: 'created', user: 'Jordan Lee', target: 'Purchase Order PO-2024-089', time: '12 min ago', type: 'create' },
  { id: 'a-2', action: 'approved', user: 'Sarah Mitchell', target: 'Expense Report EXP-2024-234', time: '28 min ago', type: 'approve' },
  { id: 'a-3', action: 'updated', user: 'Michael Chen', target: 'Inventory item TX-1002', time: '1 hour ago', type: 'update' },
  { id: 'a-4', action: 'rejected', user: 'Emily Davis', target: 'Leave request for Tom Allen', time: '2 hours ago', type: 'reject' },
  { id: 'a-5', action: 'commented on', user: 'David Kim', target: 'Q3 Sales forecast discussion', time: '3 hours ago', type: 'comment' },
  { id: 'a-6', action: 'created', user: 'Rachel Green', target: 'Customer account - TechVista Inc', time: '4 hours ago', type: 'create' },
  { id: 'a-7', action: 'approved', user: 'James Wilson', target: 'Contract CN-2024-056', time: '5 hours ago', type: 'approve' },
];

export const financeRecords: FinanceRecord[] = [
  { id: 'fin-1', date: '2026-05-15', description: 'Q2 Enterprise License Revenue', category: 'Revenue', amount: 450000, type: 'revenue', status: 'posted', department: 'Sales' },
  { id: 'fin-2', date: '2026-05-14', description: 'Office Equipment Lease', category: 'Facilities', amount: 28500, type: 'expense', status: 'posted', department: 'Operations' },
  { id: 'fin-3', date: '2026-05-14', description: 'Consulting Services - Cloud Migration', category: 'Services', amount: 175000, type: 'revenue', status: 'posted', department: 'Professional Services' },
  { id: 'fin-4', date: '2026-05-13', description: 'Software Licenses - Tools & Utilities', category: 'IT', amount: 42300, type: 'expense', status: 'pending', department: 'Engineering' },
  { id: 'fin-5', date: '2026-05-13', description: 'Employee Payroll - May Week 2', category: 'Payroll', amount: 312000, type: 'expense', status: 'posted', department: 'All' },
  { id: 'fin-6', date: '2026-05-12', description: 'Hardware Purchase - Server Racks', category: 'Infrastructure', amount: 89000, type: 'expense', status: 'reconciled', department: 'IT' },
  { id: 'fin-7', date: '2026-05-12', description: 'Monthly SaaS Subscriptions', category: 'Revenue', amount: 128000, type: 'revenue', status: 'posted', department: 'Sales' },
  { id: 'fin-8', date: '2026-05-11', description: 'Marketing Campaign - Q3 Launch', category: 'Marketing', amount: 95000, type: 'expense', status: 'pending', department: 'Marketing' },
  { id: 'fin-9', date: '2026-05-10', description: 'Training & Development Program', category: 'HR', amount: 22000, type: 'expense', status: 'posted', department: 'HR' },
  { id: 'fin-10', date: '2026-05-09', description: 'Enterprise Support Renewal', category: 'Revenue', amount: 67000, type: 'revenue', status: 'reconciled', department: 'Support' },
  { id: 'fin-11', date: '2026-05-08', description: 'Data Center Operations', category: 'Infrastructure', amount: 156000, type: 'expense', status: 'posted', department: 'IT' },
  { id: 'fin-12', date: '2026-05-07', description: 'Professional Services - Implementation', category: 'Services', amount: 210000, type: 'revenue', status: 'posted', department: 'Professional Services' },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: 'po-1', poNumber: 'PO-2024-089', vendor: 'TechSupply Corp', items: 'Server equipment, networking hardware', total: 284500, status: 'pending_approval', priority: 'high', createdBy: 'Jordan Lee', createdAt: '2026-05-14', deliveryDate: '2026-06-15', department: 'IT' },
  { id: 'po-2', poNumber: 'PO-2024-088', vendor: 'OfficeMax Pro', items: 'Office furniture, ergonomic chairs', total: 45200, status: 'approved', priority: 'medium', createdBy: 'Morgan Chen', createdAt: '2026-05-12', deliveryDate: '2026-06-01', department: 'Operations' },
  { id: 'po-3', poNumber: 'PO-2024-087', vendor: 'ChemSource Industries', items: 'Raw materials - Batch C-42', total: 128000, status: 'shipped', priority: 'high', createdBy: 'Sam Torres', createdAt: '2026-05-10', deliveryDate: '2026-05-28', department: 'Manufacturing' },
  { id: 'po-4', poNumber: 'PO-2024-086', vendor: 'DataSys Solutions', items: 'Storage array, backup drives', total: 67300, status: 'delivered', priority: 'medium', createdBy: 'Jordan Lee', createdAt: '2026-05-08', deliveryDate: '2026-05-22', department: 'IT' },
  { id: 'po-5', poNumber: 'PO-2024-085', vendor: 'Global Logistics Co', items: 'Packaging materials, pallets', total: 18900, status: 'draft', priority: 'low', createdBy: 'Riley Patel', createdAt: '2026-05-15', deliveryDate: '2026-06-10', department: 'Logistics' },
  { id: 'po-6', poNumber: 'PO-2024-084', vendor: 'Precision Parts Ltd', items: 'Mechanical components, fasteners', total: 94500, status: 'approved', priority: 'high', createdBy: 'Sam Torres', createdAt: '2026-05-07', deliveryDate: '2026-05-30', department: 'Manufacturing' },
  { id: 'po-7', poNumber: 'PO-2024-083', vendor: 'SoftwareGrid Inc', items: 'Annual software license renewal', total: 210000, status: 'pending_approval', priority: 'high', createdBy: 'Morgan Chen', createdAt: '2026-05-13', deliveryDate: '2026-06-01', department: 'Engineering' },
  { id: 'po-8', poNumber: 'PO-2024-082', vendor: 'GreenEnergy Solutions', items: 'Solar panels, inverters', total: 156000, status: 'cancelled', priority: 'medium', createdBy: 'Alex Morgan', createdAt: '2026-05-01', deliveryDate: '2026-06-20', department: 'Facilities' },
];

export const inventoryItems: InventoryItem[] = [
  { id: 'inv-1', sku: 'TECH-A100', name: 'Server Blade X200', category: 'Hardware', quantity: 34, minStock: 20, maxStock: 100, unit: 'units', location: 'Warehouse A', status: 'in_stock', lastUpdated: '2026-05-15', price: 8500 },
  { id: 'inv-2', sku: 'TECH-B200', name: 'Network Switch 48P', category: 'Networking', quantity: 12, minStock: 15, maxStock: 60, unit: 'units', location: 'Warehouse A', status: 'low_stock', lastUpdated: '2026-05-14', price: 3200 },
  { id: 'inv-3', sku: 'RAW-C300', name: 'Aluminum Sheet 4x8', category: 'Raw Materials', quantity: 240, minStock: 100, maxStock: 500, unit: 'sheets', location: 'Warehouse B', status: 'in_stock', lastUpdated: '2026-05-13', price: 145 },
  { id: 'inv-4', sku: 'RAW-D400', name: 'Copper Wire Spool', category: 'Raw Materials', quantity: 0, minStock: 50, maxStock: 200, unit: 'spools', location: 'Warehouse B', status: 'out_of_stock', lastUpdated: '2026-05-12', price: 380 },
  { id: 'inv-5', sku: 'PKG-E500', name: 'Standard Shipping Box', category: 'Packaging', quantity: 2500, minStock: 500, maxStock: 5000, unit: 'units', location: 'Warehouse C', status: 'in_stock', lastUpdated: '2026-05-15', price: 2.5 },
  { id: 'inv-6', sku: 'TECH-F600', name: 'GPU Accelerator Card', category: 'Hardware', quantity: 8, minStock: 10, maxStock: 40, unit: 'units', location: 'Warehouse A', status: 'low_stock', lastUpdated: '2026-05-14', price: 12500 },
  { id: 'inv-7', sku: 'CHEM-G700', name: 'Industrial Solvent - Grade A', category: 'Chemicals', quantity: 85, minStock: 30, maxStock: 150, unit: 'gallons', location: 'Warehouse B', status: 'in_stock', lastUpdated: '2026-05-11', price: 67 },
  { id: 'inv-8', sku: 'TECH-H800', name: 'Fiber Optic Cable 100m', category: 'Networking', quantity: 45, minStock: 25, maxStock: 100, unit: 'rolls', location: 'Warehouse A', status: 'in_stock', lastUpdated: '2026-05-10', price: 890 },
  { id: 'inv-9', sku: 'PKG-I900', name: 'Anti-static Bubble Wrap', category: 'Packaging', quantity: 120, minStock: 50, maxStock: 300, unit: 'rolls', location: 'Warehouse C', status: 'in_stock', lastUpdated: '2026-05-09', price: 18 },
  { id: 'inv-10', sku: 'TECH-J100', name: 'Cooling Fan Assembly', category: 'Hardware', quantity: 620, minStock: 100, maxStock: 400, unit: 'units', location: 'Warehouse A', status: 'overstocked', lastUpdated: '2026-05-08', price: 95 },
];

export const salesOrders: SalesOrder[] = [
  { id: 'so-1', orderNumber: 'SO-2024-1201', customer: 'TechVista Inc', email: 'orders@techvista.com', items: 3, total: 156000, status: 'shipped', date: '2026-05-14', paymentStatus: 'paid', salesRep: 'Rachel Green' },
  { id: 'so-2', orderNumber: 'SO-2024-1200', customer: 'DataFlow Systems', email: 'procurement@dataflow.io', items: 1, total: 84500, status: 'processing', date: '2026-05-13', paymentStatus: 'paid', salesRep: 'Tom Allen' },
  { id: 'so-3', orderNumber: 'SO-2024-1199', customer: 'MedCore Labs', email: 'supply@medcore.com', items: 5, total: 292000, status: 'confirmed', date: '2026-05-12', paymentStatus: 'partial', salesRep: 'Rachel Green' },
  { id: 'so-4', orderNumber: 'SO-2024-1198', customer: 'EduPrime University', email: 'purchasing@eduprime.edu', items: 2, total: 42100, status: 'pending', date: '2026-05-11', paymentStatus: 'unpaid', salesRep: 'David Kim' },
  { id: 'so-5', orderNumber: 'SO-2024-1197', customer: 'BuildRight Construction', email: 'orders@buildright.com', items: 4, total: 178000, status: 'delivered', date: '2026-05-10', paymentStatus: 'paid', salesRep: 'Tom Allen' },
  { id: 'so-6', orderNumber: 'SO-2024-1196', customer: 'GreenEnergy Solutions', email: 'procure@greenenergy.io', items: 2, total: 96000, status: 'processing', date: '2026-05-09', paymentStatus: 'paid', salesRep: 'Rachel Green' },
  { id: 'so-7', orderNumber: 'SO-2024-1195', customer: 'AeroSpace Dynamics', email: 'supply@aerospace.com', items: 8, total: 445000, status: 'confirmed', date: '2026-05-08', paymentStatus: 'partial', salesRep: 'David Kim' },
  { id: 'so-8', orderNumber: 'SO-2024-1194', customer: 'FinCore Banking', email: 'ops@fincore.com', items: 3, total: 134000, status: 'pending', date: '2026-05-07', paymentStatus: 'unpaid', salesRep: 'Tom Allen' },
];

export const employees: Employee[] = [
  { id: 'emp-1', name: 'Alex Morgan', email: 'alex.morgan@nexuscorp.com', department: 'Executive', position: 'Chief Executive Officer', status: 'active', hireDate: '2020-03-15', salary: 350000, location: 'New York, NY', manager: '-', phone: '+1 (212) 555-0101' },
  { id: 'emp-2', name: 'Jordan Lee', email: 'jordan.lee@nexuscorp.com', department: 'Operations', position: 'VP of Operations', status: 'active', hireDate: '2020-06-01', salary: 225000, location: 'New York, NY', manager: 'Alex Morgan', phone: '+1 (212) 555-0102' },
  { id: 'emp-3', name: 'Sarah Mitchell', email: 'sarah.mitchell@nexuscorp.com', department: 'Finance', position: 'Chief Financial Officer', status: 'active', hireDate: '2020-04-20', salary: 280000, location: 'Chicago, IL', manager: 'Alex Morgan', phone: '+1 (312) 555-0103' },
  { id: 'emp-4', name: 'Michael Chen', email: 'michael.chen@nexuscorp.com', department: 'Engineering', position: 'CTO', status: 'active', hireDate: '2020-05-10', salary: 300000, location: 'San Francisco, CA', manager: 'Alex Morgan', phone: '+1 (415) 555-0104' },
  { id: 'emp-5', name: 'Emily Davis', email: 'emily.davis@nexuscorp.com', department: 'HR', position: 'VP of People', status: 'active', hireDate: '2020-07-01', salary: 200000, location: 'New York, NY', manager: 'Jordan Lee', phone: '+1 (212) 555-0105' },
  { id: 'emp-6', name: 'David Kim', email: 'david.kim@nexuscorp.com', department: 'Sales', position: 'VP of Sales', status: 'active', hireDate: '2020-08-15', salary: 240000, location: 'Austin, TX', manager: 'Alex Morgan', phone: '+1 (512) 555-0106' },
  { id: 'emp-7', name: 'Rachel Green', email: 'rachel.green@nexuscorp.com', department: 'Sales', position: 'Enterprise Account Manager', status: 'active', hireDate: '2021-01-10', salary: 145000, location: 'Austin, TX', manager: 'David Kim', phone: '+1 (512) 555-0107' },
  { id: 'emp-8', name: 'Tom Allen', email: 'tom.allen@nexuscorp.com', department: 'Sales', position: 'Account Executive', status: 'active', hireDate: '2021-03-20', salary: 120000, location: 'Denver, CO', manager: 'David Kim', phone: '+1 (303) 555-0108' },
  { id: 'emp-9', name: 'Morgan Chen', email: 'morgan.chen@nexuscorp.com', department: 'Procurement', position: 'Procurement Manager', status: 'active', hireDate: '2021-02-14', salary: 130000, location: 'Chicago, IL', manager: 'Jordan Lee', phone: '+1 (312) 555-0109' },
  { id: 'emp-10', name: 'Riley Patel', email: 'riley.patel@nexuscorp.com', department: 'HR', position: 'HR Business Partner', status: 'active', hireDate: '2021-06-01', salary: 95000, location: 'New York, NY', manager: 'Emily Davis', phone: '+1 (212) 555-0110' },
  { id: 'emp-11', name: 'Sam Torres', email: 'sam.torres@nexuscorp.com', department: 'Manufacturing', position: 'Production Manager', status: 'active', hireDate: '2021-05-15', salary: 115000, location: 'Detroit, MI', manager: 'Jordan Lee', phone: '+1 (313) 555-0111' },
  { id: 'emp-12', name: 'Jessica Wu', email: 'jessica.wu@nexuscorp.com', department: 'Engineering', position: 'Senior Software Engineer', status: 'on_leave', hireDate: '2021-08-01', salary: 175000, location: 'San Francisco, CA', manager: 'Michael Chen', phone: '+1 (415) 555-0112' },
  { id: 'emp-13', name: 'James Wilson', email: 'james.wilson@nexuscorp.com', department: 'Legal', position: 'General Counsel', status: 'active', hireDate: '2020-09-01', salary: 260000, location: 'New York, NY', manager: 'Alex Morgan', phone: '+1 (212) 555-0113' },
  { id: 'emp-14', name: 'Maria Lopez', email: 'maria.lopez@nexuscorp.com', department: 'Marketing', position: 'CMO', status: 'active', hireDate: '2021-04-01', salary: 230000, location: 'Los Angeles, CA', manager: 'Alex Morgan', phone: '+1 (213) 555-0114' },
];

export const approvalRequests: ApprovalRequest[] = [
  { id: 'apr-1', type: 'purchase_order', title: 'Server Infrastructure Upgrade', requester: 'Jordan Lee', amount: 284500, status: 'pending', priority: 'high', submittedAt: '2026-05-14', dueDate: '2026-05-21', department: 'IT', description: 'Replacement of aging server infrastructure in primary data center.' },
  { id: 'apr-2', type: 'expense', title: 'Q3 Marketing Campaign Budget', requester: 'Maria Lopez', amount: 95000, status: 'pending', priority: 'medium', submittedAt: '2026-05-13', dueDate: '2026-05-25', department: 'Marketing', description: 'Digital marketing campaign for Q3 product launch.' },
  { id: 'apr-3', type: 'leave', title: 'Annual Leave - Jessica Wu', requester: 'Jessica Wu', amount: 0, status: 'approved', priority: 'low', submittedAt: '2026-05-12', dueDate: '2026-05-19', department: 'Engineering', description: '3 weeks annual leave starting June 1st.' },
  { id: 'apr-4', type: 'contract', title: 'SoftwareGrid License Renewal', requester: 'Michael Chen', amount: 210000, status: 'pending', priority: 'urgent', submittedAt: '2026-05-13', dueDate: '2026-05-18', department: 'Engineering', description: 'Annual renewal of enterprise software licenses.' },
  { id: 'apr-5', type: 'purchase_order', title: 'Office Furniture - Floor 4 Renovation', requester: 'Morgan Chen', amount: 45200, status: 'approved', priority: 'medium', submittedAt: '2026-05-10', dueDate: '2026-05-24', department: 'Operations', description: 'Ergonomic furniture for newly renovated 4th floor.' },
  { id: 'apr-6', type: 'invoice', title: 'Consulting Invoice - Cloud Migration', requester: 'Michael Chen', amount: 175000, status: 'more_info', priority: 'high', submittedAt: '2026-05-09', dueDate: '2026-05-23', department: 'Engineering', description: 'Cloud migration consulting services - Phase 2 completion.' },
  { id: 'apr-7', type: 'expense', title: 'Team Training Program', requester: 'Emily Davis', amount: 22000, status: 'rejected', priority: 'low', submittedAt: '2026-05-08', dueDate: '2026-05-22', department: 'HR', description: 'Leadership training program for managers.' },
  { id: 'apr-8', type: 'purchase_order', title: 'Raw Materials - Production Batch Q3', requester: 'Sam Torres', amount: 128000, status: 'pending', priority: 'high', submittedAt: '2026-05-11', dueDate: '2026-05-20', department: 'Manufacturing', description: 'Raw material procurement for Q3 production schedule.' },
];

export const auditLogs: AuditLog[] = [
  { id: 'aud-1', user: 'Alex Morgan', action: 'Login', module: 'Auth', target: 'Session', timestamp: '2026-05-15 08:30:22', ipAddress: '192.168.1.100', details: 'Successful login from corporate network' },
  { id: 'aud-2', user: 'Jordan Lee', action: 'Create', module: 'Procurement', target: 'PO-2024-089', timestamp: '2026-05-14 14:22:10', ipAddress: '192.168.1.105', details: 'Created new purchase order' },
  { id: 'aud-3', user: 'Sarah Mitchell', action: 'Update', module: 'Finance', target: 'Budget FY2026', timestamp: '2026-05-14 11:05:00', ipAddress: '192.168.2.50', details: 'Updated Q3 budget allocation' },
  { id: 'aud-4', user: 'Michael Chen', action: 'Delete', module: 'Inventory', target: 'Item TECH-J100', timestamp: '2026-05-13 16:45:30', ipAddress: '192.168.1.110', details: 'Removed obsolete inventory item' },
  { id: 'aud-5', user: 'Emily Davis', action: 'Update', module: 'HR', target: 'Employee emp-12', timestamp: '2026-05-13 10:15:22', ipAddress: '192.168.1.115', details: 'Updated employee status to on_leave' },
  { id: 'aud-6', user: 'David Kim', action: 'Approve', module: 'Sales', target: 'Discount Policy', timestamp: '2026-05-12 15:30:00', ipAddress: '192.168.3.10', details: 'Approved volume discount for customer TechVista Inc' },
  { id: 'aud-7', user: 'James Wilson', action: 'Create', module: 'Legal', target: 'Contract CN-2024-056', timestamp: '2026-05-12 09:00:00', ipAddress: '192.168.1.200', details: 'Created new vendor contract' },
  { id: 'aud-8', user: 'Morgan Chen', action: 'Export', module: 'Reports', target: 'Q2 Financial Report', timestamp: '2026-05-11 13:22:45', ipAddress: '192.168.1.95', details: 'Exported report as PDF' },
];

export const teamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Alex Morgan', email: 'alex.morgan@nexuscorp.com', role: 'CEO', department: 'Executive', status: 'active' },
  { id: 'tm-2', name: 'Jordan Lee', email: 'jordan.lee@nexuscorp.com', role: 'VP Operations', department: 'Operations', status: 'active' },
  { id: 'tm-3', name: 'Sarah Mitchell', email: 'sarah.mitchell@nexuscorp.com', role: 'CFO', department: 'Finance', status: 'active' },
  { id: 'tm-4', name: 'Michael Chen', email: 'michael.chen@nexuscorp.com', role: 'CTO', department: 'Engineering', status: 'active' },
  { id: 'tm-5', name: 'Emily Davis', email: 'emily.davis@nexuscorp.com', role: 'VP People', department: 'HR', status: 'active' },
  { id: 'tm-6', name: 'David Kim', email: 'david.kim@nexuscorp.com', role: 'VP Sales', department: 'Sales', status: 'active' },
  { id: 'tm-7', name: 'Maria Lopez', email: 'maria.lopez@nexuscorp.com', role: 'CMO', department: 'Marketing', status: 'active' },
  { id: 'tm-8', name: 'James Wilson', email: 'james.wilson@nexuscorp.com', role: 'General Counsel', department: 'Legal', status: 'active' },
];

export const inventoryCategories = ['Hardware', 'Networking', 'Raw Materials', 'Packaging', 'Chemicals'];
export const departments = ['Executive', 'Operations', 'Finance', 'Engineering', 'HR', 'Sales', 'Marketing', 'Manufacturing', 'IT', 'Legal', 'Logistics'];
