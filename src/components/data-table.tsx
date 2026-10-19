import { Table } from 'antd'
import type { TableProps } from 'antd'

interface DataTableProps<T> {
  data: T[];
  columns: TableProps<T>['columns'];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
}

export function DataTable<T extends object>({
  data,
  columns,
  loading = false,
  rowKey = 'id',
}: DataTableProps<T>) {
  return (
    <Table<T>
      dataSource={data}
      columns={columns}
      loading={loading}
      rowKey={rowKey}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      bordered
      size="middle"
    />
  );
}
