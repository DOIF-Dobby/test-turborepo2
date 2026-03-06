import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection, useAppTable } from '@repo/table'
import { useTradingScheduleColumns } from '../hooks/use-trading-schedule-columns'
import { useTradingSettingScheduleList } from '../services/schedule.hooks'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { TradingScheduleAddModal } from './schedule.add-modal'
import { TradingScheduleEditModal } from './schedule.edit-modal'

interface TradingSettingScheduleSectionProps {
  tradingSettingData: TradingSettingWithAlgorithmResponse
}

export function TradingSettingScheduleSection({
  tradingSettingData,
}: TradingSettingScheduleSectionProps) {
  const { tradingSettingId, isActive: settingIsActive } = tradingSettingData

  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const { data, isLoading } = useTradingSettingScheduleList(tradingSettingId)

  const columns = useTradingScheduleColumns(tradingSettingId)

  const table = useAppTable({
    data,
    columns,
    enableRowSelection: true,
  })

  const { hasSelection, selectionItem } = getTableSelection(table)

  return (
    <>
      <section>
        <SectionToolbar
          title="스케줄 관리"
          actions={
            <>
              <AddButton isDisabled={settingIsActive} onPress={addModal.open} />
              <EditButton
                isDisabled={settingIsActive || !hasSelection}
                onPress={editModal.open}
              />
              <DeleteButton isDisabled={settingIsActive || !hasSelection} />
            </>
          }
        />
        <AppTable table={table} isLoading={isLoading} />
      </section>

      <TradingScheduleAddModal disclosure={addModal} />
      <TradingScheduleEditModal disclosure={editModal} data={selectionItem} />
    </>
  )
}
