import { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { auditLogs, teamMembers } from '../../data/mockData';
import type { AuditLog, TeamMember } from '../../types';
import { Search, Shield, Users, History, Sliders } from 'lucide-react';

const logColumns = [
  { key: 'user', header: 'User', sortable: true, width: '150px' },
  { key: 'action', header: 'Action', sortable: true, width: '100px', render: (r: AuditLog) => <Badge variant={r.action === 'Login' ? 'info' : r.action === 'Delete' ? 'error' : 'default'}>{r.action}</Badge> },
  { key: 'module', header: 'Module', sortable: true, width: '120px' },
  { key: 'target', header: 'Target' },
  { key: 'timestamp', header: 'Timestamp', sortable: true, width: '170px' },
  { key: 'ipAddress', header: 'IP Address', width: '140px' },
];

const teamColumns = [
  {
    key: 'name', header: 'Name', render: (r: TeamMember) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={r.name} size={28} />
        <div>
          <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{r.name}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{r.email}</div>
        </div>
      </div>
    ),
  },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'department', header: 'Department', sortable: true },
  { key: 'status', header: 'Status', width: '100px', render: (r: TeamMember) => <Badge variant={r.status === 'active' ? 'success' : 'default'}>{r.status}</Badge> },
];

const roles = [
  { name: 'Executive', permissions: ['All modules', 'Approvals', 'Reporting', 'Settings'] },
  { name: 'Finance', permissions: ['Finance', 'Reports', 'Approvals'] },
  { name: 'Procurement', permissions: ['Procurement', 'Inventory', 'Reports'] },
  { name: 'Inventory', permissions: ['Inventory', 'Reports'] },
  { name: 'Sales', permissions: ['Sales', 'Reports', 'Dashboard'] },
  { name: 'HR', permissions: ['HR', 'Reports', 'Approvals'] },
  { name: 'Admin', permissions: ['All modules', 'Settings', 'Audit Logs', 'User Management'] },
];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('roles');
  const [auditSearch, setAuditSearch] = useState('');

  const filteredLogs = auditLogs.filter(l =>
    l.user.toLowerCase().includes(auditSearch.toLowerCase()) || l.action.toLowerCase().includes(auditSearch.toLowerCase()) || l.module.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="animate-fade">
      <PageHeader title="Settings" subtitle="Role permissions, team management, and audit trails" />

      <Tabs
        tabs={[
          { id: 'roles', label: 'Roles & Permissions', icon: <Shield size={16} /> },
          { id: 'team', label: 'Team', icon: <Users size={16} />, count: teamMembers.length },
          { id: 'audit', label: 'Audit Log', icon: <History size={16} /> },
          { id: 'integrations', label: 'Integrations', icon: <Sliders size={16} /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {activeId => {
          if (activeId === 'roles') {
            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
                {roles.map(r => (
                  <Card key={r.name} padding="md">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                      <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: 0 }}>{r.name}</h4>
                      <Badge variant="default">Admin</Badge>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                      {r.permissions.map(p => (
                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--color-success)' }}>✓</span> {p}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-light)' }}>
                      <Button variant="ghost" size="sm">Edit Permissions</Button>
                    </div>
                  </Card>
                ))}
              </div>
            );
          }
          if (activeId === 'team') {
            return <Table columns={teamColumns} data={teamMembers} keyExtractor={t => t.id} pageSize={8} />;
          }
          if (activeId === 'audit') {
            return (
              <div>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <Input placeholder="Search audit logs..." value={auditSearch} onChange={e => setAuditSearch(e.target.value)} icon={<Search size={16} />} />
                </div>
                <Table columns={logColumns} data={filteredLogs} keyExtractor={l => l.id} pageSize={8} />
              </div>
            );
          }
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
              {[
                { name: 'Slack', desc: 'Notifications and alerts', status: 'Connected', color: 'var(--color-success)' },
                { name: 'Jira', desc: 'Project sync integration', status: 'Connected', color: 'var(--color-success)' },
                { name: 'Salesforce', desc: 'CRM data sync', status: 'Disconnected', color: 'var(--text-tertiary)' },
                { name: 'Stripe', desc: 'Payment processing', status: 'Connected', color: 'var(--color-success)' },
                { name: 'AWS', desc: 'Cloud infrastructure', status: 'Pending', color: 'var(--color-warning)' },
                { name: 'Okta', desc: 'SSO authentication', status: 'Connected', color: 'var(--color-success)' },
              ].map(integration => (
                <Card key={integration.name}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: 0 }}>{integration.name}</h4>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: integration.color }} />
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>{integration.desc}</p>
                  <div style={{ fontSize: 'var(--text-xs)', color: integration.color, marginTop: 'var(--space-2)' }}>{integration.status}</div>
                </Card>
              ))}
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
