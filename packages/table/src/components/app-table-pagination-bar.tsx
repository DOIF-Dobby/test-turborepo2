'use client'

import type { RowData, Table } from '@tanstack/react-table'
import { AppTablePageSizeSelect } from './app-table-page-size-select'
import { AppTablePagination } from './app-table-pagination'

export interface AppTablePaginationBarProps<TData extends RowData> {
  table: Table<TData>
}

export function AppTablePaginationBar<TData extends RowData>({
  table,
}: AppTablePaginationBarProps<TData>) {
  return (
    <div className="gap-sw-2xs flex w-full flex-col items-center py-2 sm:flex-row">
      {/* 1. 왼쪽 빈 공간 (데스크탑 중앙 정렬용) */}
      <div className="hidden sm:block sm:flex-1"></div>

      {/* 2. 중앙 페이지네이션 번호 */}
      <div className="flex shrink-0 justify-center">
        <AppTablePagination table={table} />
      </div>

      {/* 3. 우측 사이즈 선택 Select */}
      <div className="flex w-full justify-center sm:w-auto sm:flex-1 sm:justify-end">
        <AppTablePageSizeSelect table={table} />
      </div>
    </div>
  )
}
