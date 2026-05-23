import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Plus, Download } from 'lucide-react';
import { inventoryItems } from '../../data/mockData';
import type { InventoryItem } from '../../types';

const statusBadge: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  in_stock: 'success', low_stock: 'warning', out_of_stock: 'error', overstocked: 'info',
};

const columns = [
  { key: 'sku', header: 'SKU', sortable: true, width: '110px' },
  { key: 'name', header: 'Product Name', sortable: true },
  { key: 'category', header: 'Category', sortable: true, width: '130px' },
  {
    key: 'quantity', header: 'Qty', sortable: true, width: '80px',
    render: (r: InventoryItem) => (
      <span style={{ fontWeight: 600, color: r.quantity <= r.minStock ? 'var(--color-error)' : r.quantity >= r.maxStock ? 'var(--color-warning)' : 'var(--text-primary)' }}>
        {r.quantity}
      </span>
    ),
  },
  { key: 'minStock', header: 'Min', width: '60px' },
  { key: 'maxStock', header: 'Max', width: '60px' },
  { key: 'unit', header: 'Unit', width: '70px' },
  { key: 'location', header: 'Location', width: '120px' },
  {
    key: 'status', header: 'Status', width: '120px',
    render: (r: InventoryItem) => <Badge variant={statusBadge[r.status]}>{r.status.replace('_', ' ')}</Badge>,
  },
  { key: 'price', header: 'Price', width: '100px', sortable: true, render: (r: InventoryItem) => `$${r.price.toLocaleString()}` },
];

export function InventoryPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const filtered = inventoryItems.filter(i =>
    (i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategory || i.category === filterCategory)
  );

  return (
    <div className="animate-fade">
      <PageHeader
        title="Inventory"
        subtitle="Stock management and warehouse tracking"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />}>Add Item</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{inventoryItems.reduce((s, i) => s + i.quantity, 0).toLocaleString()}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Units</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{inventoryItems.filter(i => i.status === 'low_stock').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>Low Stock Items</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{inventoryItems.filter(i => i.status === 'out_of_stock').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>Out of Stock</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>${inventoryItems.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Value</div></Card>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search inventory..." />
        <Select options={[{ value: 'Hardware', label: 'Hardware' }, { value: 'Networking', label: 'Networking' }, { value: 'Raw Materials', label: 'Raw Materials' }, { value: 'Packaging', label: 'Packaging' }, { value: 'Chemicals', label: 'Chemicals' }]} value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ width: 160 }} />
        {selectedIds.size > 0 && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{selectedIds.size} selected</span>}
      </div>

      <Table columns={columns} data={filtered} keyExtractor={i => i.id} pageSize={8} selectable selectedIds={selectedIds} onSelectionChange={setSelectedIds} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Inventory Item">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Input label="SKU" placeholder="TECH-XYZ" />
            <Input label="Product Name" placeholder="Enter product name" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Select label="Category" options={[{ value: 'Hardware', label: 'Hardware' }, { value: 'Networking', label: 'Networking' }, { value: 'Raw Materials', label: 'Raw Materials' }, { value: 'Packaging', label: 'Packaging' }, { value: 'Chemicals', label: 'Chemicals' }]} />
            <Input label="Unit" placeholder="units, sheets, etc." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)' }}>
            <Input label="Quantity" type="number" placeholder="0" />
            <Input label="Min Stock" type="number" placeholder="0" />
            <Input label="Max Stock" type="number" placeholder="0" />
          </div>
          <Input label="Price" type="number" placeholder="0.00" />
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>Save Item</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
