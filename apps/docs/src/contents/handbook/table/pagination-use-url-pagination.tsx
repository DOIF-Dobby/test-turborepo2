'use client'

import { useUrlPagination } from '@repo/next-utils/hooks'
import { AppTable, AppTablePaginationBar, useAppTable } from '@repo/table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { Suspense, useMemo } from 'react'
import { fetchData } from './fetch-data'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
  createdAt: Date
}

function PaginationUseUrlPaginationTable() {
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

  const {
    pagination: userPagination,
    onPaginationChange: onUserPaginationChange,
  } = useUrlPagination({ prefix: 'user', defaultPageSize: 10 })

  const dataQuery = useQuery({
    queryKey: ['data', userPagination],
    queryFn: () => fetchData(userPagination),
    placeholderData: keepPreviousData,
  })

  const table = useAppTable({
    data: dataQuery.data?.rows,
    columns,
    manualPagination: true,
    rowCount: dataQuery.data?.rowCount,
    state: {
      pagination: userPagination,
    },
    onPaginationChange: onUserPaginationChange,
  })

  return (
    <>
      <pre>{JSON.stringify(userPagination, null, 2)}</pre>
      <div className="gap-sw-2xs flex flex-col">
        <AppTable table={table} isLoading={dataQuery.isFetching} />
        <AppTablePaginationBar table={table} />
      </div>
    </>
  )
}

const queryClient = new QueryClient()

export default function PaginationUseUrlPagination() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <PaginationUseUrlPaginationTable />
      </Suspense>
    </QueryClientProvider>
  )
}
