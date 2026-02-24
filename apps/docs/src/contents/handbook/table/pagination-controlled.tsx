'use client'

import { AppTable, AppTablePaginationBar, useAppTable } from '@repo/table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { fetchData } from './fetch-data'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

function PaginationControlledAppTable() {
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

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData,
  })

  const table = useAppTable({
    data: dataQuery.data?.rows,
    columns,
    manualPagination: true,
    rowCount: dataQuery.data?.rowCount,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
      <div className="gap-sw-2xs flex flex-col">
        <AppTable table={table} isLoading={dataQuery.isFetching} />
        <AppTablePaginationBar table={table} />
      </div>
    </>
  )
}

const queryClient = new QueryClient()

export default function PaginationControlled() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginationControlledAppTable />
    </QueryClientProvider>
  )
}
