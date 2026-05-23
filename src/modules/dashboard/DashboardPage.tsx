import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { KpiCard } from '../../components/ui/KpiCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { ComposedBarChart } from '../../components/charts';
import { PieChart } from '../../components/charts';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus, Download } from 'lucide-react';
import { kpiMetrics, revenueData, departmentRevenue, tasks, activities } from '../../data/mockData';

export function DashboardPage() {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const displayTasks = showAllTasks ? tasks : tasks.slice(0, 4);

  const priorityColors: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    low: 'success', medium: 'warning', high: 'error', critical: 'error',
  };

  return (
    <div className="animate-fade">
      <PageHeader
        title="Executive Dashboard"
        subtitle="Enterprise-wide performance overview"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />}>Add Widget</Button>
          </>
        }
      />

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {kpiMetrics.map(kpi => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }} className="dashboard-main-grid">
        {/* Revenue Chart */}
        <Card>
          <CardHeader title="Revenue vs Target" subtitle="Monthly performance (in thousands)" />
          <ComposedBarChart data={revenueData} height={280} />
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader
            title="My Tasks"
            subtitle={`${tasks.filter(t => t.status !== 'completed').length} pending`}
            action={!showAllTasks ? <Button variant="ghost" size="sm" onClick={() => setShowAllTasks(true)}>View all</Button> : undefined}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayTasks.map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                <input type="checkbox" checked={task.status === 'completed'} readOnly style={{ accentColor: 'var(--color-primary-600)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>Due {task.dueDate} · {task.assignee}</div>
                </div>
                <Badge variant={priorityColors[task.priority]} size="sm">{task.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }} className="dashboard-bottom-grid">
        {/* Revenue by Region */}
        <Card>
          <CardHeader title="Revenue by Region" subtitle="Current quarter distribution" />
          <PieChart data={departmentRevenue} height={260} />
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader title="Recent Activity" subtitle="Latest actions across modules" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activities.slice(0, 5).map(act => {
              const actionColor: Record<string, string> = {
                create: 'var(--color-success)', update: 'var(--color-info)',
                approve: 'var(--color-success)', reject: 'var(--color-error)', comment: 'var(--color-warning)',
              };
              return (
                <div key={act.id} style={{ display: 'flex', gap: 12, padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: actionColor[act.type], marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                      <strong>{act.user}</strong> {act.action} <span style={{ color: 'var(--text-link)' }}>{act.target}</span>
                    </span>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{act.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
