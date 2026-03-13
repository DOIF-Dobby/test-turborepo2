import { DashboardPageHeader } from '@/components/layout/dashboard/dashboard-page-header'
import { MarketInstrumentSection } from '@/features/futures/components/market-instrument.section'
import { RiskPolicySection } from '@/features/futures/components/risk-policy.section'
import { FutureSummarySection } from '@/features/futures/components/summary.section'
import { futuresQueries } from '@/features/futures/services/futures.hooks'
import { marketInstrumentQueries } from '@/features/futures/services/market-instrument.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export const dynamic = 'force-dynamic'

export default async function FuturesPage() {
  const state = await getDehydratedQueries([
    futuresQueries.riskPolicy(),
    marketInstrumentQueries.list(),
  ])

  return (
    <>
      <DashboardPageHeader title="해외선물 관리" />
      <Hydrate state={state}>
        <div className="flex flex-col gap-sw-md">
          <RiskPolicySection />
          <FutureSummarySection />
          <MarketInstrumentSection />
        </div>
      </Hydrate>
    </>
  )
}
