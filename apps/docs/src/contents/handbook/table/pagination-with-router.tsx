'use client'

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
}

export function PaginationWithRouterTable() {
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
    isPagination: true,
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
    <div className="gap-sw-2xs flex flex-col items-center">
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
