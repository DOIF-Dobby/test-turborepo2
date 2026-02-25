'use client'

import { useUrlSorting } from '@repo/next-utils/hooks'
import { AppTable, useAppTable } from '@repo/table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { Suspense, useMemo } from 'react'
import { fetchSortedData } from './fetch-sorted-data'
import type { Person } from './make-data'

export function SortingWithUrlSortingAppTable() {
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

  const { sorting, onSortingChange } = useUrlSorting({
    prefix: 'user',
  })

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
    onSortingChange,
  })

  return (
    <div>
      <AppTable table={table} isLoading={dataQuery.isFetching} />
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  )
}

const queryClient = new QueryClient()

export default function SortingWithUrlSorting() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <SortingWithUrlSortingAppTable />
      </Suspense>
    </QueryClientProvider>
  )
}
