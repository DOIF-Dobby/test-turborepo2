'use client'

import { AppTable, useAppTable } from '@repo/table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import { fetchSortedData } from './fetch-sorted-data'
import type { Person } from './make-data'

export function SortingWithRouterServerAppTable() {
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

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sorting = useMemo<SortingState>(() => {
    const sortParam = searchParams.get('sort')
    const sortDescParam = searchParams.get('desc')

    if (!sortParam) return []

    return [
      {
        id: sortParam,
        desc: sortDescParam === 'true',
      },
    ]
  }, [searchParams])

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
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater
      const params = new URLSearchParams(searchParams.toString())

      if (!newSorting || newSorting.length === 0) {
        params.delete('sort')
        params.delete('desc')
      } else {
        params.set('sort', String(newSorting[0]?.id))
        params.set('desc', String(newSorting[0]?.desc))
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
  })

  return (
    <div>
      <AppTable table={table} isLoading={dataQuery.isFetching} />
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  )
}

const queryClient = new QueryClient()

export default function SortingWithRouterServer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <SortingWithRouterServerAppTable />
      </Suspense>
    </QueryClientProvider>
  )
}
