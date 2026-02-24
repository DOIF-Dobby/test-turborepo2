import {
  type RowData,
  type TableOptions,
  getCoreRowModel as defaultGetCoreRowModel,
  getPaginationRowModel as defaultGetPaginationRowModel,
  getSortedRowModel as defaultGetSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

type Props<TData extends RowData> = Omit<
  TableOptions<TData>,
  'data' | 'getCoreRowModel'
>

interface UseAppTableProps<TData extends RowData> extends Props<TData> {
  data?: TData[]
  getCoreRowModel?: TableOptions<TData>['getCoreRowModel']
  enablePagination?: boolean
}

export function useAppTable<TData extends RowData>(
  props: UseAppTableProps<TData>,
) {
  const {
    data,
    getCoreRowModel = defaultGetCoreRowModel(),
    getPaginationRowModel = defaultGetPaginationRowModel(),
    getSortedRowModel = defaultGetSortedRowModel(),
    enablePagination = false,
    enableSorting = false,
    manualSorting = false,
    ...otherProps
  } = props

  const defaultData = useMemo(() => [], [])

  const table = useReactTable<TData>({
    data: data ?? defaultData,
    getCoreRowModel,
    getPaginationRowModel: enablePagination ? getPaginationRowModel : undefined,
    getSortedRowModel:
      enableSorting && !manualSorting ? getSortedRowModel : undefined,
    enableSorting: enableSorting || manualSorting,
    manualSorting,
    ...otherProps,
  })

  return table
}
