import { SectionToolbar } from '@/components/section/section-toolbar'
import { AppTable, useAppTable } from '@repo/table'
import { useMemo } from 'react'
import { useTradingSettingColumns } from '../hooks/use-trading-setting-columns'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'

interface SettingsNormalSectionProps {
  data: TradingSettingWithAlgorithmResponse[]
  isLoading: boolean
}

export function SettingsNormalSection({
  data,
  isLoading,
}: SettingsNormalSectionProps) {
  // 일반 알고리즘 설정 목록
  const normalList = useMemo(
    () => data.filter(({ algorithmType }) => algorithmType === 'NORMAL'),
    [data],
  )

  const columns = useTradingSettingColumns()

  const table = useAppTable({
    data: normalList,
    columns,
  })

  return (
    <>
      <section>
        <SectionToolbar title="일반 알고리즘" />
        <AppTable table={table} isLoading={isLoading} />
      </section>
    </>
  )
}
