'use client'

import { formatDateTime } from '@repo/date'
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
  createdAt: Date
}

function PaginationControlledAppTable() {
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
      <div className="gap-sw-2xs flex flex-col">
        <AppTable table={table} isLoading={dataQuery.isFetching} />
        <AppTablePaginationBar table={table} />
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
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
