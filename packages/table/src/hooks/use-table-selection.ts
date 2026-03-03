import type { RowData, Table } from '@tanstack/react-table'

export function useTableSelection<TData extends RowData>(table: Table<TData>) {
  const selectedRows = table.getSelectedRowModel().rows

  return {
    selectionItem: selectedRows[0]?.original,
    selectionItems: selectedRows.map((row) => row.original),
    hasSelection: selectedRows.length > 0,
  }
}
