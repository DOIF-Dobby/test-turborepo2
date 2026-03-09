import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection, useAppTable } from '@repo/table'
import { useState } from 'react'
import { useTradingParameterColumns } from '../hooks/use-tradiing-parameter-columns'
import {
  useDeleteTradingParameter,
  useTradingSettingParameters,
} from '../services/parameter.hooks'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { TradingParameterAddModal } from './parameter.add-modal'
import { TradingParameterEditModal } from './parameter.edit-modal'

interface TradingSettingParameterSectionProps {
  tradingSettingData: TradingSettingWithAlgorithmResponse
}

export function TradingSettingParameterSection({
  tradingSettingData,
}: TradingSettingParameterSectionProps) {
  const { tradingSettingId, isActive: settingIsActive } = tradingSettingData
  const [rowSelection, setRowSelection] = useState({})
  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const deleteMutation = useDeleteTradingParameter()

  const { data, isLoading } = useTradingSettingParameters(tradingSettingId)

  const columns = useTradingParameterColumns()

  const table = useAppTable({
    data,
    columns,
    enableRowSelection: !settingIsActive,
    state: {
      rowSelection: settingIsActive ? {} : rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  })

  const { hasSelection, selectionItem } = getTableSelection(table)

  const handleDelete = async () => {
    if (selectionItem) {
      await deleteMutation.mutateAsync({
        tradingSettingId,
        parameterId: selectionItem.parameterId,
      })
      table.resetRowSelection()
    }
  }

  return (
    <>
      <section>
        <SectionToolbar
          title="파라미터 관리"
          actions={
            <>
              <AddButton isDisabled={settingIsActive} onPress={addModal.open} />
              <EditButton
                isDisabled={settingIsActive || !hasSelection}
                onPress={editModal.open}
              />
              <DeleteButton
                isDisabled={settingIsActive || !hasSelection}
                onDelete={handleDelete}
              />
            </>
          }
        />
        <AppTable table={table} isLoading={isLoading} />
      </section>

      <TradingParameterAddModal
        tradingSettingId={tradingSettingId}
        disclosure={addModal}
      />
      <TradingParameterEditModal
        tradingSettingId={tradingSettingId}
        data={selectionItem}
        disclosure={editModal}
      />
    </>
  )
}
