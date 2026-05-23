import { useState, useMemo, type ReactNode } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  pageSize?: number;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  loading?: boolean;
}

export function Table<T extends Record<string, any>>({ columns, data, keyExtractor, onRowClick, pageSize = 10, selectable, selectedIds, onSelectionChange, loading }: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null || bVal == null) return 0;
      const cmp = typeof aVal === 'number' ? aVal - (bVal as number) : String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleAll = () => {
    if (!selectedIds || !onSelectionChange) return;
    if (selectedIds.size === paged.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(paged.map(keyExtractor)));
    }
  };

  const toggleOne = (id: string) => {
    if (!selectedIds || !onSelectionChange) return;
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const cellStyle: React.CSSProperties = {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  };

  const headerStyle: React.CSSProperties = {
    ...cellStyle,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-xs)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    background: 'var(--bg-surface)',
    borderBottom: '2px solid var(--border-color)',
    cursor: 'default',
    userSelect: 'none',
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        <div style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--color-primary-500)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 8px' }} />
        Loading data...
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
      <table style={{ width: '100%', minWidth: 600 }}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ ...headerStyle, width: 40 }}>
                <input type="checkbox" checked={paged.length > 0 && selectedIds?.size === paged.length} onChange={toggleAll} style={{ accentColor: 'var(--color-primary-600)' }} />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                style={{ ...headerStyle, width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {col.header}
                  {col.sortable && (
                    sortKey === col.key ? (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : <ChevronsUpDown size={14} style={{ opacity: 0.3 }} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--text-tertiary)' }}>
                No data found
              </td>
            </tr>
          ) : (
            paged.map(row => {
              const id = keyExtractor(row);
              return (
                <tr
                  key={id}
                  style={{ cursor: onRowClick ? 'pointer' : undefined, transition: 'background var(--transition-fast)' }}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td style={{ ...cellStyle, width: 40 }} onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={selectedIds?.has(id) ?? false} onChange={() => toggleOne(id)} style={{ accentColor: 'var(--color-primary-600)' }} />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} style={cellStyle}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: page === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)', cursor: page === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={16} />
            </button>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} style={{ padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: page >= totalPages - 1 ? 'var(--text-tertiary)' : 'var(--text-primary)', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
