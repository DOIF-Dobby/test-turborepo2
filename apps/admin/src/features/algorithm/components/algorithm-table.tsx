'use client'

import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { TableToolbar } from '@/components/table/table-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, useAppTable, useTableSelection } from '@repo/table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { AlgorithmResponse } from '../api'
import { ALGORITHM_TYPES_MAP } from '../constants'
import { useAlgorithms, useDeleteAlgorithm } from '../hooks'
import { AlgorithmAddModal } from './algorithm-add-modal'
import { AlgorithmEditModal } from './algorithm-edit-modal'

/**
 * 알고리즘 테이블
 */
export function AlgorithmTable() {
  // 알고리즘 목록 조회
  const { data, isLoading } = useAlgorithms()

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
        accessorFn: (row) => ALGORITHM_TYPES_MAP[row.algorithmType],
      },
    ],
    [],
  )

  const table = useAppTable({
    data,
    columns,
    enableRowSelection: true,
  })

  const { selectionItem, hasSelection } = useTableSelection(table)

  const addModal = useDisclosure()
  const editModal = useDisclosure()

  // 알고리즘 삭제
  const deleteAlgorithm = useDeleteAlgorithm()
  const handleDeleteAlgorithm = async () => {
    if (selectionItem) {
      await deleteAlgorithm.mutateAsync(selectionItem.algorithmId)
      table.resetRowSelection()
    }
  }

  return (
    <>
      <TableToolbar
        title="알고리즘 관리"
        actions={
          <>
            <AddButton onPress={addModal.open} />
            <EditButton onPress={editModal.open} isDisabled={!hasSelection} />
            <DeleteButton
              isDisabled={!hasSelection}
              onDelete={handleDeleteAlgorithm}
            />
          </>
        }
      />
      <AppTable table={table} isLoading={isLoading} />

      <AlgorithmAddModal modalState={addModal} />
      <AlgorithmEditModal modalState={editModal} data={selectionItem} />
    </>
  )
}
