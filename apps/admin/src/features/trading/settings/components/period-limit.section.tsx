import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection, useAppTable } from '@repo/table'
import { useState } from 'react'
import { useTradingPeriodLimitColumns } from '../hooks/use-trading-period-limit-columns'
import {
  useDeleteTradingPeriodLimit,
  useTradingPeriodLimits,
} from '../services/period-limit.hooks'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { TradingPeriodLimitAddModal } from './period-limit.add-modal'
import { TradingPeriodLimitEditModal } from './period-limit.edit-modal'

interface TradingPeriodLimitSectionProps {
  tradingSettingData: TradingSettingWithAlgorithmResponse
}

export function TradingPeriodLimitSection({
  tradingSettingData,
}: TradingPeriodLimitSectionProps) {
  const { tradingSettingId, isActive: settingIsActive } = tradingSettingData

  const [rowSelection, setRowSelection] = useState({})

  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const { data, isLoading } = useTradingPeriodLimits(tradingSettingId)
  const deleteMutation = useDeleteTradingPeriodLimit()

  const columns = useTradingPeriodLimitColumns()

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
        periodLimitId: selectionItem.periodLimitId,
      })
      table.resetRowSelection()
    }
  }

  return (
    <>
      <section>
        <SectionToolbar
          title="기간 제한"
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

      <TradingPeriodLimitAddModal
        disclosure={addModal}
        tradingSettingId={tradingSettingId}
      />
      <TradingPeriodLimitEditModal
        disclosure={editModal}
        tradingSettingId={tradingSettingId}
        data={selectionItem}
      />
    </>
  )
}
