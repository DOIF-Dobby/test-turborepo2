import { AddButton } from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { currencyUtils } from '@/utils/domain'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, useAppTable } from '@repo/table'
import { useMemo } from 'react'
import { useTradingSettingColumns } from '../hooks/use-trading-setting-columns'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { SettingsAddModal } from './settings-add-modal'

interface SettingsHedgingSectionProps {
  data: TradingSettingWithAlgorithmResponse[]
  isLoading: boolean
}

export function SettingsHedgingSection({
  data,
  isLoading,
}: SettingsHedgingSectionProps) {
  const addModal = useDisclosure()

  // 헷징 알고리즘이면서 법정 화폐 + 상품권 통화 목록
  const hedgingBaseList = useMemo(
    () =>
      data.filter(
        ({ algorithmType, currency }) =>
          algorithmType === 'HEDGING' &&
          (currencyUtils.isFiat(currency) || currencyUtils.isGift(currency)),
      ),
    [data],
  )

  // 헷징 알고리즘이면서 원자재 통화 목록
  const hedgingCommoidtyList = useMemo(
    () =>
      data.filter(
        ({ algorithmType, currency }) =>
          algorithmType === 'HEDGING' && currencyUtils.isCommodity(currency),
      ),
    [data],
  )

  const columns = useTradingSettingColumns()

  // 법정 화폐 + 상품권 통화 테이블
  const baseTable = useAppTable({
    data: hedgingBaseList,
    columns,
  })

  // 원자재 테이블
  const commodityTable = useAppTable({
    data: hedgingCommoidtyList,
    columns,
  })

  return (
    <>
      <section>
        <SectionToolbar
          title="헷징 알고리즘"
          actions={<AddButton onPress={addModal.open} />}
        />
        <div className="flex flex-col gap-sw-sm">
          <AppTable table={baseTable} isLoading={isLoading} />
          <AppTable table={commodityTable} isLoading={isLoading} />
        </div>
      </section>

      <SettingsAddModal disclosure={addModal} />
    </>
  )
}
