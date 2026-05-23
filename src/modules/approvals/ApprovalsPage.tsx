import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { SearchInput } from '../../components/ui/SearchInput';
import { Drawer } from '../../components/ui/Drawer';
import { CheckCircle, XCircle, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { approvalRequests } from '../../data/mockData';
import type { ApprovalRequest } from '../../types';

const typeBadge: Record<string, 'info' | 'success' | 'warning' | 'error' | 'default'> = {
  purchase_order: 'info', expense: 'warning', leave: 'success', contract: 'error', invoice: 'default',
};
const statusIcon: Record<string, typeof Clock> = { pending: Clock, approved: CheckCircle, rejected: XCircle, more_info: AlertTriangle };
const statusColor: Record<string, string> = { pending: 'var(--color-warning)', approved: 'var(--color-success)', rejected: 'var(--color-error)', more_info: 'var(--color-info)' };
const priorityBadge: Record<string, 'success' | 'warning' | 'error'> = { low: 'success', medium: 'warning', high: 'error', urgent: 'error' };

export function ApprovalsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ApprovalRequest | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const filtered = approvalRequests.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.requester.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'pending') return matchesSearch && (a.status === 'pending' || a.status === 'more_info');
    if (activeTab === 'approved') return matchesSearch && a.status === 'approved';
    if (activeTab === 'rejected') return matchesSearch && a.status === 'rejected';
    return matchesSearch;
  });

  return (
    <div className="animate-fade">
      <PageHeader
        title="Approval Center"
        subtitle="Review and manage pending approvals"
        actions={<Button size="sm" variant="secondary">View History</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{approvalRequests.filter(a => a.status === 'pending').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>Pending</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{approvalRequests.filter(a => a.status === 'more_info').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-info)' }}>More Info Needed</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{approvalRequests.filter(a => a.status === 'approved').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)' }}>Approved</div></Card>
        <Card padding="sm"><div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{approvalRequests.filter(a => a.priority === 'urgent').length}</div><div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>Urgent</div></Card>
      </div>

      <Tabs
        tabs={[
          { id: 'pending', label: 'Pending', count: approvalRequests.filter(a => a.status === 'pending' || a.status === 'more_info').length },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
          { id: 'all', label: 'All', count: approvalRequests.length },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {() => (
          <div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <SearchInput value={search} onChange={setSearch} placeholder="Search approvals..." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {filtered.map(a => {
                const StatusIcon = statusIcon[a.status];
                return (
                  <div
                    key={a.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 'var(--space-4) var(--space-5)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all var(--transition-fast)', boxShadow: 'var(--shadow-sm)' }}
                    onClick={() => setSelected(a)}
                  >
                    <div style={{ color: statusColor[a.status], flexShrink: 0 }}><StatusIcon size={24} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</span>
                        <Badge variant={typeBadge[a.type]} size="sm">{a.type.replace('_', ' ')}</Badge>
                        <Badge variant={priorityBadge[a.priority]} size="sm">{a.priority}</Badge>
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>
                        {a.requester} · {a.department} · Submitted {a.submittedAt} · Due {a.dueDate}
                        {a.amount > 0 && <span style={{ marginLeft: 8, fontWeight: 600 }}>${a.amount.toLocaleString()}</span>}
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Tabs>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? ''}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Requester</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{selected.requester}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Department</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{selected.department}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Type</div><Badge>{selected.type.replace('_', ' ')}</Badge></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Amount</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>${selected.amount.toLocaleString()}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Submitted</div><div style={{ fontSize: 'var(--text-sm)' }}>{selected.submittedAt}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Due</div><div style={{ fontSize: 'var(--text-sm)' }}>{selected.dueDate}</div></div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Description</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.6 }}>{selected.description}</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)' }}>
              <Button size="sm" variant="primary" icon={<CheckCircle size={14} />}>Approve</Button>
              <Button size="sm" variant="danger" icon={<XCircle size={14} />}>Reject</Button>
              <Button size="sm" variant="secondary" icon={<AlertTriangle size={14} />}>Request Info</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
