'use client'

import { formatDateTime } from '@repo/date'
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
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: '이름',
        size: 170,
      },
      {
        accessorKey: 'lastName',
        header: '성',
      },
      {
        accessorKey: 'age',
        header: '나이',
        size: 80,
      },
      {
        accessorKey: 'visits',
        header: '방문 횟수',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: '상태',
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: '생성일',
        cell: (info) => formatDateTime(info.getValue<Date>()),
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
