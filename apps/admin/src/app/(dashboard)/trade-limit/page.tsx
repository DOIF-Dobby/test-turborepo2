import { DashboardPageHeader } from '@/components/layout/dashboard-page-header'
import { TradeLimitView } from '@/features/trade-limit/components/trade-limit.view'
import { globalPeriodLimitQueries } from '@/features/trade-limit/services/global-period-limit.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export const dynamic = 'force-dynamic'

export default async function TradeLimitPage() {
  const state = await getDehydratedQueries([globalPeriodLimitQueries.list()])

  return (
    <>
      <DashboardPageHeader title="거래 제한" />

      <Hydrate state={state}>
        <TradeLimitView />
      </Hydrate>
    </>
  )
}
