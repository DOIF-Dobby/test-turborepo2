'use client'

import { AppTable, useAppTable } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

export default function WithTableComponent() {
  const data = useMemo(() => [...defaultData], [])

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: '이름',
      },
      {
        accessorKey: 'lastName',
        header: '성',
      },
      {
        accessorKey: 'age',
        header: '나이',
      },
      {
        accessorKey: 'visits',
        header: '방문 횟수',
      },
      {
        accessorKey: 'status',
        header: '상태',
      },
      {
        accessorKey: 'progress',
        header: '진행률',
      },
    ],
    [],
  )

  const table = useAppTable({
    data,
    columns,
  })

  return <AppTable table={table} />
}
