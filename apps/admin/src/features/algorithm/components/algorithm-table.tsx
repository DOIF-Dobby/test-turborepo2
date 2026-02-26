'use client'

import { AppTable, useAppTable } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useAlgorithms } from '../hooks/use-algorithms'
import type { AlgorithmResponse } from '../types/algorithm-type'

/**
 * 알고리즘 테이블
 */
export function AlgorithmTable() {
  const columns = useMemo<ColumnDef<AlgorithmResponse>[]>(
    () => [
      {
        accessorKey: 'algorithmId',
        header: '알고리즘 ID',
      },
      {
        accessorKey: 'algorithmKey',
        header: '알고리즘 키',
      },
      {
        accessorKey: 'algorithmName',
        header: '알고리즘명',
      },
      {
        accessorKey: 'algorithmDescription',
        header: '알고리즘 설명',
      },
      {
        accessorKey: 'algorithmType',
        header: '알고리즘 타입',
      },
    ],
    [],
  )

  const { data, isFetching } = useAlgorithms()

  const table = useAppTable({
    data,
    columns,
  })

  return <AppTable table={table} isLoading={isFetching} />
}
