import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Drawer } from '../../components/ui/Drawer';
import { Plus, Download } from 'lucide-react';
import { purchaseOrders } from '../../data/mockData';
import type { PurchaseOrder } from '../../types';

const statusBadge: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'default', pending_approval: 'warning', approved: 'success', shipped: 'info', delivered: 'success', cancelled: 'error',
};
const priorityBadge: Record<string, 'success' | 'warning' | 'error'> = { low: 'success', medium: 'warning', high: 'error' };

const columns = [
  { key: 'poNumber', header: 'PO Number', sortable: true, width: '150px' },
  { key: 'vendor', header: 'Vendor', sortable: true },
  { key: 'items', header: 'Items' },
  { key: 'total', header: 'Total', sortable: true, width: '120px', render: (r: PurchaseOrder) => <span style={{ fontWeight: 600 }}>${r.total.toLocaleString()}</span> },
  { key: 'status', header: 'Status', width: '150px', render: (r: PurchaseOrder) => <Badge variant={statusBadge[r.status] || 'default'}>{r.status.replace('_', ' ')}</Badge> },
  { key: 'priority', header: 'Priority', width: '100px', render: (r: PurchaseOrder) => <Badge variant={priorityBadge[r.priority] || 'warning'}>{r.priority}</Badge> },
  { key: 'createdAt', header: 'Created', sortable: true, width: '120px' },
  { key: 'department', header: 'Dept', sortable: true, width: '120px' },
];

export function ProcurementPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PurchaseOrder | null>(null);
  const filtered = purchaseOrders.filter(po => po.vendor.toLowerCase().includes(search.toLowerCase()) || po.poNumber.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade">
      <PageHeader
        title="Procurement"
        subtitle="Purchase orders and vendor management"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />}>New PO</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>${purchaseOrders.reduce((s, p) => s + p.total, 0).toLocaleString()}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total PO Value</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{purchaseOrders.filter(p => p.status === 'pending_approval').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Pending Approval</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{purchaseOrders.filter(p => p.status === 'delivered').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Delivered</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{purchaseOrders.filter(p => p.priority === 'high').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>High Priority</div></Card>
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search POs or vendors..." />
      </div>

      <Table columns={columns} data={filtered} keyExtractor={p => p.id} pageSize={8} onRowClick={setSelected} />

      {/* Detail Drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.poNumber ?? ''}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Vendor</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{selected.vendor}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Total</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>${selected.total.toLocaleString()}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Status</div><Badge variant={statusBadge[selected.status]}>{selected.status.replace('_', ' ')}</Badge></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Priority</div><Badge variant={priorityBadge[selected.priority]}>{selected.priority}</Badge></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Created By</div><div style={{ fontSize: 'var(--text-sm)' }}>{selected.createdBy}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Department</div><div style={{ fontSize: 'var(--text-sm)' }}>{selected.department}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Created</div><div style={{ fontSize: 'var(--text-sm)' }}>{selected.createdAt}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Delivery</div><div style={{ fontSize: 'var(--text-sm)' }}>{selected.deliveryDate}</div></div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Items</div>
              <div style={{ fontSize: 'var(--text-sm)' }}>{selected.items}</div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <Button size="sm" variant="primary">Approve</Button>
              <Button size="sm" variant="secondary">Request Changes</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
