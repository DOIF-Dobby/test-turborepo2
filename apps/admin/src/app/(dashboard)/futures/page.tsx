import { DashboardPageHeader } from '@/components/layout/dashboard-page-header'
import { FuturesView } from '@/features/futures/components/futures.view'
import { marketInstrumentQueries } from '@/features/futures/services/market-instrument.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export const dynamic = 'force-dynamic'

export default async function FuturesPage() {
  const state = await getDehydratedQueries([marketInstrumentQueries.list()])

  return (
    <>
      <DashboardPageHeader title="해외선물 관리" />
      <Hydrate state={state}>
        <FuturesView />
      </Hydrate>
    </>
  )
}
