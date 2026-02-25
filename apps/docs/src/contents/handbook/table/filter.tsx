'use client'

import { AppTable, useAppTable } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
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

export default function Filter() {
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
      },
      {
        accessorFn: (row) => row.lastName,
        header: '성',
        id: 'lastName',
      },
      {
        accessorKey: 'age',
        header: '나이',
        size: 100,
      },
      {
        accessorKey: 'visits',
        header: '방문 횟수',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: '상태',
        meta: {
          filterVariant: 'combobox',
        },
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        size: 100,
      },
      {
        accessorKey: 'createdAt',
        header: '생성일',
        cell: (info) => info.getValue<Date>().toLocaleString(),
        size: 180,
      },
    ],
    [],
  )

  const data = useMemo(() => makeData(100), [])

  const table = useAppTable({
    data,
    columns,
    enableFilters: true,
    enableSorting: true,
  })

  return <AppTable table={table} />
}
