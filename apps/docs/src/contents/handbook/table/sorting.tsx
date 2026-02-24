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

export default function Sorting() {
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

  const data = useMemo(() => makeData(100), [])

  const table = useAppTable({
    data,
    columns,
    enableSorting: true,
  })

  return <AppTable table={table} />
}
