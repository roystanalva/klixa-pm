import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { PieChart } from '../../components/charts';
import { Plus, Download } from 'lucide-react';
import { employees, departments } from '../../data/mockData';
import type { Employee } from '../../types';

const statusBadge: Record<string, 'success' | 'warning' | 'error'> = { active: 'success', on_leave: 'warning', terminated: 'error' };

const columns = [
  {
    key: 'name', header: 'Employee', sortable: true, width: '200px',
    render: (r: Employee) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={r.name} size={32} />
        <div>
          <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{r.name}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{r.email}</div>
        </div>
      </div>
    ),
  },
  { key: 'position', header: 'Position', sortable: true },
  { key: 'department', header: 'Department', sortable: true, width: '130px' },
  { key: 'location', header: 'Location', width: '130px' },
  { key: 'manager', header: 'Manager', width: '140px' },
  { key: 'hireDate', header: 'Hired', sortable: true, width: '110px' },
  { key: 'salary', header: 'Salary', sortable: true, width: '110px', render: (r: Employee) => `$${(r.salary / 1000).toFixed(0)}K` },
  { key: 'status', header: 'Status', width: '100px', render: (r: Employee) => <Badge variant={statusBadge[r.status]}>{r.status.replace('_', ' ')}</Badge> },
];

export function HRPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('directory');
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase()) || e.position.toLowerCase().includes(search.toLowerCase())
  );

  const deptDist = departments.filter(d => employees.some(e => e.department === d)).map(d => ({
    label: d,
    value: employees.filter(e => e.department === d).length,
  }));

  return (
    <div className="animate-fade">
      <PageHeader
        title="Human Resources"
        subtitle="Employee directory and management"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />}>Add Employee</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{employees.length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Employees</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{employees.filter(e => e.status === 'active').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)' }}>Active</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{employees.filter(e => e.status === 'on_leave').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>On Leave</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{new Set(employees.map(e => e.department)).size}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Departments</div></Card>
      </div>

      <Tabs
        tabs={[
          { id: 'directory', label: 'Directory', count: employees.length },
          { id: 'departments', label: 'Departments' },
          { id: 'org', label: 'Org Chart' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {activeId => {
          if (activeId === 'departments') {
            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                <Card><CardHeader title="Department Distribution" /><PieChart data={deptDist} height={300} /></Card>
                <Card>
                  <CardHeader title="Department Overview" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {deptDist.map(d => (
                      <div key={d.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                        <span style={{ fontSize: 'var(--text-sm)' }}>{d.label}</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          }
          return (
            <div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search employees..." />
              </div>
              <Table columns={columns} data={filtered} keyExtractor={e => e.id} pageSize={8} />
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
