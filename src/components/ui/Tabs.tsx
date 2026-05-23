import { useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (id: string) => void;
  children?: (activeId: string) => ReactNode;
}

export function Tabs({ tabs, activeTab: controlledActive, onChange, children }: TabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.id ?? '');
  const activeId = controlledActive ?? internal;

  const setActive = (id: string) => {
    if (!controlledActive) setInternal(id);
    onChange?.(id);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-color)', marginBottom: 'var(--space-5)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-sm)',
              fontWeight: activeId === tab.id ? 600 : 400,
              color: activeId === tab.id ? 'var(--color-primary-600)' : 'var(--text-secondary)',
              borderBottom: activeId === tab.id ? '2px solid var(--color-primary-600)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'all var(--transition-fast)',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.count != null && (
              <span style={{ background: activeId === tab.id ? 'var(--color-primary-100)' : 'var(--bg-badge)', color: activeId === tab.id ? 'var(--color-primary-700)' : 'var(--text-secondary)', borderRadius: 'var(--radius-full)', padding: '0 var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {children?.(activeId)}
    </div>
  );
}
