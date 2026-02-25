import {
  type RowData,
  type TableOptions,
  getCoreRowModel as defaultGetCoreRowModel,
  getFacetedMinMaxValues as defaultGetFacetedMinMaxValues,
  getFacetedRowModel as defaultGetFacetedRowModel,
  getFacetedUniqueValues as defaultGetFacetedUniqueValues,
  getFilteredRowModel as defaultGetFilteredRowModel,
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
    getFilteredRowModel = defaultGetFilteredRowModel(),
    getFacetedRowModel = defaultGetFacetedRowModel(),
    getFacetedUniqueValues = defaultGetFacetedUniqueValues(),
    getFacetedMinMaxValues = defaultGetFacetedMinMaxValues(),
    enablePagination = false,
    enableSorting = false,
    manualSorting = false,
    enableFilters = false,
    enableRowSelection = false,
    enableMultiRowSelection = false,
    enableSubRowSelection = false,
    ...otherProps
  } = props

  const defaultData = useMemo(() => [], [])

  const table = useReactTable<TData>({
    data: data ?? defaultData,
    getCoreRowModel,
    getPaginationRowModel: enablePagination ? getPaginationRowModel : undefined,
    getSortedRowModel:
      enableSorting && !manualSorting ? getSortedRowModel : undefined,
    getFilteredRowModel: enableFilters ? getFilteredRowModel : undefined,
    getFacetedRowModel: enableFilters ? getFacetedRowModel : undefined,
    getFacetedUniqueValues: enableFilters ? getFacetedUniqueValues : undefined,
    getFacetedMinMaxValues: enableFilters ? getFacetedMinMaxValues : undefined,
    enableSorting: enableSorting || manualSorting,
    enableFilters,
    manualSorting,
    enableRowSelection,
    enableMultiRowSelection,
    enableSubRowSelection,
    ...otherProps,
  })

  return table
}
