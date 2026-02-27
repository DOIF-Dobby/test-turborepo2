'use client'

import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { TableToolbar } from '@/components/table/table-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, useAppTable } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { AlgorithmResponse } from '../fetchers'
import { useAlgorithmsQuery } from '../hooks'
import { AlgorithmFormModal } from './algorithm-form-modal'

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
    enableRowSelection: true,
  })

  const selectedAlgorithm = table
    .getSelectedRowModel()
    .rows.map((row) => row.original)[0]

  const { isOpen, open, close } = useDisclosure()

  return (
    <>
      <TableToolbar
        title="알고리즘 관리"
        actions={
          <>
            <AddButton onPress={open} />
            <EditButton onPress={open} isDisabled={!selectedAlgorithm} />
            <DeleteButton isDisabled={!selectedAlgorithm} />
          </>
        }
      />
      <AppTable table={table} isLoading={isFetching} />

      <AlgorithmFormModal
        open={isOpen}
        onOpenChange={close}
        algorithm={selectedAlgorithm}
      />
    </>
  )
}
