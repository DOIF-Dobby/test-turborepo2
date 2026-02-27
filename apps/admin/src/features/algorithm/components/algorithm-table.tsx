'use client'

import { AppTable, useAppTable } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { AlgorithmResponse } from '../fetchers'
import { useAlgorithmsQuery } from '../hooks'

/**
 * 알고리즘 테이블
 */
export function AlgorithmTable() {
  const columns = useMemo<ColumnDef<AlgorithmResponse>[]>(
    () => [
      {
        accessorKey: 'algorithmId',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'algorithmKey',
        header: '알고리즘 키',
        size: 200,
      },
      {
        accessorKey: 'algorithmName',
        header: '알고리즘명',
        size: 200,
      },
      {
        accessorKey: 'algorithmDescription',
        header: '알고리즘 설명',
        size: 300,
      },
      {
        accessorKey: 'algorithmType',
        header: '알고리즘 타입',
        size: 100,
      },
    ],
    [],
  )

  const { data, isFetching } = useAlgorithmsQuery()

  const table = useAppTable({
    data,
    columns,
  })

  return <AppTable table={table} isLoading={isFetching} />
}
