'use client'

import { AppTable, useAppTable } from '@repo/table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { fetchSortedData } from './fetch-sorted-data'
import type { Person } from './make-data'

export function SortingControlledAppTable() {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 60,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 60,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 120,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.getValue<Date>().toLocaleString(),
        size: 180,
      },
    ],
    [],
  )

  const [sorting, setSorting] = useState<SortingState>([])

  const dataQuery = useQuery({
    queryKey: ['data', sorting],
    queryFn: () => fetchSortedData(sorting),
    placeholderData: keepPreviousData,
  })

  const table = useAppTable({
    data: dataQuery.data,
    columns,
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  })

  return (
    <div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
      <AppTable table={table} isLoading={dataQuery.isFetching} />
    </div>
  )
}

const queryClient = new QueryClient()

export default function SortingControlled() {
  return (
    <QueryClientProvider client={queryClient}>
      <SortingControlledAppTable />
    </QueryClientProvider>
  )
}
