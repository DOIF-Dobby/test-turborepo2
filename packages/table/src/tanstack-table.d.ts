import '@tanstack/react-table'
import type { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    onClickRow?: (row: Row<TData>) => void
  }

  // eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'combobox'
    headerAlign?: 'left' | 'center' | 'right'
    cellAlign?: 'left' | 'center' | 'right'
  }
}

export {}
