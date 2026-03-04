'use client'

import { formatDateTime } from '@repo/date'
import { AppTable, AppTablePaginationBar, useAppTable } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import { makeData } from './make-data'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
  createdAt: Date
}

export function PaginationWithRouterTable() {
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

  const data = useMemo(() => makeData(10000), [])

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

  const table = useAppTable({
    data,
    columns,
    enablePagination: true,
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
    <div className="flex flex-col items-center gap-sw-2xs">
      <AppTable table={table} />
      <AppTablePaginationBar table={table} />
    </div>
  )
}

export default function PaginationWithRouter() {
  return (
    <Suspense>
      <PaginationWithRouterTable />
    </Suspense>
  )
}
