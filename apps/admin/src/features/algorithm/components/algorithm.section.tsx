import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection } from '@repo/table'
import type { Table } from '@tanstack/react-table'
import type { AlgorithmResponse } from '../services/algorithm.api'
import { useDeleteAlgorithm } from '../services/algorithm.hooks'
import { AlgorithmAddModal } from './algorithm.add-modal'
import { AlgorithmEditModal } from './algorithm.edit-modal'

interface AlgorithmSectionProps {
  table: Table<AlgorithmResponse>
  isLoading: boolean
}

/**
 * 알고리즘 섹션
 */
export function AlgorithmSection({ table, isLoading }: AlgorithmSectionProps) {
  const { selectionItem, hasSelection } = getTableSelection(table)
  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const deleteMutation = useDeleteAlgorithm()

  const handleDelete = async () => {
    if (selectionItem) {
      await deleteMutation.mutateAsync(selectionItem.algorithmId)
      table.resetRowSelection()
    }
  }

  return (
    <>
      <section>
        <SectionToolbar
          title="알고리즘 목록"
          actions={
            <>
              <AddButton onPress={addModal.open} />
              <EditButton onPress={editModal.open} isDisabled={!hasSelection} />
              <DeleteButton
                isDisabled={!hasSelection}
                onDelete={handleDelete}
              />
            </>
          }
        />
        <AppTable table={table} isLoading={isLoading} />
      </section>

      <AlgorithmAddModal disclosure={addModal} />
      <AlgorithmEditModal disclosure={editModal} data={selectionItem} />
    </>
  )
}
