import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { ComposedBarChart, BarChart } from '../../components/charts';
import { PieChart } from '../../components/charts';
import { Download, FileText } from 'lucide-react';
import { revenueData, departmentRevenue, purchaseOrders, inventoryItems } from '../../data/mockData';

const reports = [
  { id: 'r1', name: 'Quarterly Financial Summary', type: 'PDF', date: '2026-05-01', size: '2.4 MB' },
  { id: 'r2', name: 'Inventory Valuation Report', type: 'PDF', date: '2026-05-05', size: '1.8 MB' },
  { id: 'r3', name: 'Sales Performance Q2', type: 'Excel', date: '2026-05-10', size: '3.2 MB' },
  { id: 'r4', name: 'Procurement Analysis', type: 'PDF', date: '2026-04-28', size: '1.2 MB' },
  { id: 'r5', name: 'Employee Headcount Report', type: 'Excel', date: '2026-05-12', size: '0.9 MB' },
  { id: 'r6', name: 'Approval Workflow Metrics', type: 'PDF', date: '2026-05-08', size: '1.5 MB' },
];

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="animate-fade">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Business intelligence and downloadable reports"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Download All</Button>
            <Button size="sm" icon={<FileText size={14} />}>Generate Report</Button>
          </>
        }
      />

      <Tabs
        tabs={[
          { id: 'analytics', label: 'Analytics' },
          { id: 'financial', label: 'Financial' },
          { id: 'saved', label: 'Saved Reports', count: reports.length },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {activeId => {
          if (activeId === 'analytics') {
            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }} className="reports-grid">
                <Card><CardHeader title="Revenue Trend" subtitle="Monthly revenue (in thousands)" /><ComposedBarChart data={revenueData} height={280} /></Card>
                <Card><CardHeader title="Revenue by Region" subtitle="Current quarter" /><PieChart data={departmentRevenue} height={280} /></Card>
                <Card><CardHeader title="PO Value Distribution" subtitle="By department" /><BarChart data={[
                  { label: 'IT', value: purchaseOrders.filter(p => p.department === 'IT').reduce((s, p) => s + p.total, 0) },
                  { label: 'Ops', value: purchaseOrders.filter(p => p.department === 'Operations').reduce((s, p) => s + p.total, 0) },
                  { label: 'Mfg', value: purchaseOrders.filter(p => p.department === 'Manufacturing').reduce((s, p) => s + p.total, 0) },
                  { label: 'Eng', value: purchaseOrders.filter(p => p.department === 'Engineering').reduce((s, p) => s + p.total, 0) },
                  { label: 'Log', value: purchaseOrders.filter(p => p.department === 'Logistics').reduce((s, p) => s + p.total, 0) },
                  { label: 'Fac', value: purchaseOrders.filter(p => p.department === 'Facilities').reduce((s, p) => s + p.total, 0) },
                ]} height={280} /></Card>
                <Card><CardHeader title="Inventory by Category" subtitle="Units in stock" /><BarChart data={[
                  { label: 'Hardware', value: inventoryItems.filter(i => i.category === 'Hardware').reduce((s, i) => s + i.quantity, 0) },
                  { label: 'Networking', value: inventoryItems.filter(i => i.category === 'Networking').reduce((s, i) => s + i.quantity, 0) },
                  { label: 'Raw Mat.', value: inventoryItems.filter(i => i.category === 'Raw Materials').reduce((s, i) => s + i.quantity, 0) },
                  { label: 'Packaging', value: inventoryItems.filter(i => i.category === 'Packaging').reduce((s, i) => s + i.quantity, 0) },
                  { label: 'Chemicals', value: inventoryItems.filter(i => i.category === 'Chemicals').reduce((s, i) => s + i.quantity, 0) },
                ]} height={280} /></Card>
              </div>
            );
          }
          if (activeId === 'financial') {
            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                <Card><CardHeader title="Revenue vs Expenses" /><ComposedBarChart data={revenueData} height={300} /></Card>
                <Card>
                  <CardHeader title="Key Financial Metrics" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 'var(--text-sm)' }}>Total Revenue (YTD)</span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>$17.3M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 'var(--text-sm)' }}>Total Expenses (YTD)</span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>$11.8M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 'var(--text-sm)' }}>Net Profit</span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-success)' }}>$5.5M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 'var(--text-sm)' }}>Operating Margin</span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>31.8%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0' }}>
                      <span style={{ fontSize: 'var(--text-sm)' }}>Cash on Hand</span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>$8.2M</span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          }
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {reports.map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FileText size={20} style={{ color: 'var(--color-primary-500)' }} />
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{r.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{r.type} · {r.size} · {r.date}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon={<Download size={14} />}>Download</Button>
                </div>
              ))}
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
