'use client'

import { useAppTable } from '@repo/table'
import { Table } from '@repo/ui/components/table'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'
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
        size: 120,
      },
      {
        accessorKey: 'lastName',
        header: '성',
        size: 120,
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
        size: 100,
      },
    ],
    [],
  )

  const table = useAppTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <Table.HeaderGroup>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head key={header.id}>
                <Table.HeadText>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Table.HeadText>
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.HeaderGroup>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        {table.getFooterGroups().map((footerGroup) => (
          <Table.Row key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <Table.Head key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Footer>
    </Table>
  )
}
