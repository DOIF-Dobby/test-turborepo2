'use client'

import { formatDateTime } from '@repo/date'
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

export default function AlignSizeCell() {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
        meta: {
          cellAlign: 'center',
          headerAlign: 'center',
        },
      },
      {
        accessorKey: 'firstName',
        header: '이름',
        size: 170,
        cell: ({ row }) => {
          const { original } = row
          return original.age > 20 ? (
            <span className="bg-red-200 px-2 text-green-600">
              {original.firstName}
            </span>
          ) : (
            original.firstName
          )
        },
      },
      {
        accessorKey: 'lastName',
        header: '성',
      },
      {
        accessorKey: 'age',
        header: '나이',
        size: 80,
        meta: {
          headerAlign: 'right',
          cellAlign: 'right',
        },
      },
      {
        accessorKey: 'visits',
        header: '방문 횟수',
        size: 100,
        meta: {
          headerAlign: 'right',
          cellAlign: 'right',
        },
      },
      {
        accessorKey: 'status',
        header: '상태',
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
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

  const data = useMemo(() => makeData(100), [])

  const table = useAppTable({
    data,
    columns,
  })

  return (
    <>
      <AppTable table={table} />
    </>
  )
}
