import { TableToolbar } from '@/components/table/table-toolbar'
import { currencyUtils } from '@/utils/domain'
import { AppTable, useAppTable } from '@repo/table'
import { useMemo } from 'react'
import { useTradingSettingColumns } from '../hooks/use-trading-setting-columns'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'

interface SettingsHedgingSectionProps {
  data: TradingSettingWithAlgorithmResponse[]
  isLoading: boolean
}

export function SettingsHedgingSection({
  data,
  isLoading,
}: SettingsHedgingSectionProps) {
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

  const baseTable = useAppTable({
    data: hedgingBaseList,
    columns,
  })

  const commodityTable = useAppTable({
    data: hedgingCommoidtyList,
    columns,
  })

  return (
    <>
      <section>
        <TableToolbar title="헷징 알고리즘" />
        <AppTable table={baseTable} isLoading={isLoading} />
        <AppTable table={commodityTable} isLoading={isLoading} />
      </section>
    </>
  )
}
