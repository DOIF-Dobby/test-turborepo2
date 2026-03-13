import { DashboardPageHeader } from '@/components/layout/dashboard/dashboard-page-header'
import { TradeLimitView } from '@/features/trade-limit/components/trade-limit.view'
import { globalEmergencyLimitQueries } from '@/features/trade-limit/services/global-emergency-limit.hooks'
import { globalPeriodLimitQueries } from '@/features/trade-limit/services/global-period-limit.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export const dynamic = 'force-dynamic'

export default async function TradeLimitPage() {
  const state = await getDehydratedQueries([
    globalEmergencyLimitQueries.info(),
    globalPeriodLimitQueries.list(),
  ])

  return (
    <>
      <DashboardPageHeader title="거래 제한" />

      <Hydrate state={state}>
        <TradeLimitView />
      </Hydrate>
    </>
  )
}
