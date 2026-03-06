import { DashboardPageHeader } from '@/components/layout/dashboard-page-header'
import { algorithmQueries } from '@/features/algorithm/services/algorithm.hooks'
import { TradingSettingsDetailView } from '@/features/trading/settings/components/detail.view'
import { tradingScheduleQueries } from '@/features/trading/settings/services/schedule.hooks'
import { tradingSettingsQueries } from '@/features/trading/settings/services/settings.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

type Params = Promise<{ id: string }>

export default async function TradingSettingDetailPage({
  params,
}: {
  params: Params
}) {
  const { id } = await params
  const tradingSettingId = Number(id)

  const state = await getDehydratedQueries([
    tradingSettingsQueries.detail(tradingSettingId),
    algorithmQueries.list(),
    tradingScheduleQueries.list(tradingSettingId),
  ])

  return (
    <>
      <DashboardPageHeader title="자동 거래 설정 상세" />
      <Hydrate state={state}>
        <TradingSettingsDetailView tradingSettingId={tradingSettingId} />
      </Hydrate>
    </>
  )
}
