import type { ReactNode } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: { header: string; accessorKey?: keyof T; cell?: (item: T) => ReactNode }[];
}

export function DataTable<T extends { id?: string | number }>({ data, columns }: DataTableProps<T>) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground border-b font-medium">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="p-3 font-semibold">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-muted-foreground">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr key={item.id ?? rowIdx} className="hover:bg-muted/50 transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="p-3">
                    {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey] ?? '') : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
