import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Tabs } from '../../components/ui/Tabs';
import { ComposedBarChart } from '../../components/charts';
import { Plus, Download } from 'lucide-react';
import { salesOrders, revenueData } from '../../data/mockData';
import type { SalesOrder } from '../../types';

const statusBadge: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'default', confirmed: 'info', processing: 'warning', shipped: 'info', delivered: 'success', cancelled: 'error',
};
const paymentBadge: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  paid: 'success', partial: 'warning', unpaid: 'error', refunded: 'default',
};

const columns = [
  { key: 'orderNumber', header: 'Order #', sortable: true, width: '150px' },
  { key: 'customer', header: 'Customer', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'items', header: 'Items', width: '60px', sortable: true },
  { key: 'total', header: 'Total', sortable: true, width: '120px', render: (r: SalesOrder) => <span style={{ fontWeight: 600 }}>${r.total.toLocaleString()}</span> },
  { key: 'status', header: 'Status', width: '130px', render: (r: SalesOrder) => <Badge variant={statusBadge[r.status]}>{r.status}</Badge> },
  { key: 'paymentStatus', header: 'Payment', width: '100px', render: (r: SalesOrder) => <Badge variant={paymentBadge[r.paymentStatus]}>{r.paymentStatus}</Badge> },
  { key: 'date', header: 'Date', sortable: true, width: '120px' },
  { key: 'salesRep', header: 'Sales Rep', sortable: true, width: '130px' },
];

export function SalesPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const filtered = salesOrders.filter(s =>
    s.customer.toLowerCase().includes(search.toLowerCase()) || s.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade">
      <PageHeader
        title="Sales"
        subtitle="Orders, customers, and revenue tracking"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />}>New Order</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>${salesOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Revenue</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{salesOrders.length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Orders</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{salesOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>Pending Orders</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{salesOrders.filter(o => o.paymentStatus === 'unpaid').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>Unpaid</div></Card>
      </div>

      <Tabs
        tabs={[
          { id: 'orders', label: 'Orders', count: salesOrders.length },
          { id: 'analytics', label: 'Analytics' },
          { id: 'customers', label: 'Customers' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {activeId => {
          if (activeId === 'analytics') {
            return <Card><CardHeader title="Sales Performance" subtitle="Monthly revenue (in thousands)" /><ComposedBarChart data={revenueData} height={320} /></Card>;
          }
          return (
            <div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search orders or customers..." />
              </div>
              <Table columns={columns} data={filtered} keyExtractor={s => s.id} pageSize={8} />
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
