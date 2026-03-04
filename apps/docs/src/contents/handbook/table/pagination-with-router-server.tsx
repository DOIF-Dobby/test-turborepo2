'use client'

import { formatDateTime } from '@repo/date'
import { AppTable, AppTablePaginationBar, useAppTable } from '@repo/table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

function PaginationWithRouterServerTable() {
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

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pagination = useMemo(() => {
    const pageParam = searchParams.get('page')
    const pageSizeParam = searchParams.get('pageSize')

    return {
      pageIndex: pageParam ? Number(pageParam) - 1 : 0,
      pageSize: pageSizeParam ? Number(pageSizeParam) : 10,
    }
  }, [searchParams])

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
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(newPagination.pageIndex + 1))
      params.set('pageSize', String(newPagination.pageSize))

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
  })

  return (
    <>
      <div className="flex flex-col gap-sw-2xs">
        <AppTable table={table} isLoading={dataQuery.isFetching} />
        <AppTablePaginationBar table={table} />
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </>
  )
}

const queryClient = new QueryClient()

export default function PaginationWithRouterServer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <PaginationWithRouterServerTable />
      </Suspense>
    </QueryClientProvider>
  )
}
