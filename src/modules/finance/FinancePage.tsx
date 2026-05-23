import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { KpiCard } from '../../components/ui/KpiCard';
import { ComposedBarChart } from '../../components/charts';
import { PieChart } from '../../components/charts';
import { SearchInput } from '../../components/ui/SearchInput';
import { Plus, Download } from 'lucide-react';
import { financeRecords, revenueData, departmentRevenue } from '../../data/mockData';
import type { FinanceRecord } from '../../types';

const statusBadge: Record<string, 'success' | 'warning' | 'info'> = { posted: 'success', pending: 'warning', reconciled: 'info' };
const typeBadge: Record<string, 'success' | 'error'> = { revenue: 'success', expense: 'error' };

const columns = [
  { key: 'date', header: 'Date', sortable: true, width: '120px' },
  { key: 'description', header: 'Description', sortable: true },
  { key: 'category', header: 'Category', sortable: true, width: '140px' },
  {
    key: 'amount', header: 'Amount', sortable: true, width: '140px',
    render: (row: FinanceRecord) => (
      <span style={{ fontWeight: 600, color: row.type === 'revenue' ? 'var(--color-success)' : 'var(--color-error)' }}>
        {row.type === 'revenue' ? '+' : '-'}${row.amount.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'type', header: 'Type', width: '100px',
    render: (row: FinanceRecord) => <Badge variant={typeBadge[row.type]}>{row.type}</Badge>,
  },
  {
    key: 'status', header: 'Status', width: '120px',
    render: (row: FinanceRecord) => <Badge variant={statusBadge[row.status]}>{row.status}</Badge>,
  },
  { key: 'department', header: 'Department', sortable: true, width: '140px' },
];

export function FinancePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const filtered = financeRecords.filter(r => r.description.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));

  const totalRevenue = financeRecords.filter(r => r.type === 'revenue').reduce((s, r) => s + r.amount, 0);
  const totalExpenses = financeRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);

  return (
    <div className="animate-fade">
      <PageHeader
        title="Finance"
        subtitle="Financial overview and transaction management"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />}>New Transaction</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <KpiCard label="Total Revenue" value={`$${(totalRevenue / 1000000).toFixed(1)}M`} trend={12.5} trendLabel="vs last quarter" icon="DollarSign" />
        <KpiCard label="Total Expenses" value={`$${(totalExpenses / 1000000).toFixed(1)}M`} trend={-4.2} trendLabel="vs last quarter" icon="TrendingUp" />
        <KpiCard label="Net Margin" value={`${(((totalRevenue - totalExpenses) / totalRevenue) * 100).toFixed(1)}%`} trend={3.8} trendLabel="improvement" icon="ClipboardCheck" />
        <KpiCard label="Pending Items" value={financeRecords.filter(r => r.status === 'pending').length.toString()} trend={-15} trendLabel="vs last month" icon="Package" />
      </div>

      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'transactions', label: 'Transactions', count: financeRecords.length },
          { id: 'budgets', label: 'Budgets' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {activeId => {
          if (activeId === 'overview') {
            return (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-5)' }}>
                <Card><CardHeader title="Revenue vs Expenses" subtitle="Monthly comparison" /><ComposedBarChart data={revenueData} height={300} /></Card>
                <Card><CardHeader title="Department Distribution" /><PieChart data={departmentRevenue} height={300} /></Card>
              </div>
            );
          }
          return (
            <div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search transactions..." />
              </div>
              <Table columns={columns} data={filtered} keyExtractor={r => r.id} pageSize={8} />
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
