import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection, useAppTable } from '@repo/table'
import { useGlobalPeriodLimitColumns } from '../hooks/use-global-period-limit.columns'
import {
  useDeleteGlobalPeriodLimit,
  useGlobalPeriodLimits,
} from '../services/global-period-limit.hooks'
import { GlobalPeriodLimitAddModal } from './global-period-limit.add-modal'
import { GlobalPeriodLimitEditModal } from './global-period-limit.edit-modal'

export function GlobalPeriodLimitSection() {
  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const deleteMutation = useDeleteGlobalPeriodLimit()

  const { data, isLoading } = useGlobalPeriodLimits()
  const columns = useGlobalPeriodLimitColumns()

  const table = useAppTable({
    data,
    columns,
    enableRowSelection: true,
  })

  const { hasSelection, selectionItem } = getTableSelection(table)

  const handleDelete = async () => {
    if (selectionItem) {
      await deleteMutation.mutateAsync(selectionItem.limitId)
      table.resetRowSelection()
    }
  }

  return (
    <>
      <section>
        <SectionToolbar
          title="전역 기간 제한"
          actions={
            <>
              <AddButton onPress={addModal.open} />
              <EditButton isDisabled={!hasSelection} onPress={editModal.open} />
              <DeleteButton
                isDisabled={!hasSelection}
                onDelete={handleDelete}
              />
            </>
          }
        />
        <AppTable table={table} isLoading={isLoading} />
      </section>

      <GlobalPeriodLimitAddModal disclosure={addModal} />
      <GlobalPeriodLimitEditModal disclosure={editModal} data={selectionItem} />
    </>
  )
}
