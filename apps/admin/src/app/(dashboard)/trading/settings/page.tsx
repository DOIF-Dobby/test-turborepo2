import { DashboardPageHeader } from '@/components/layout/dashboard/dashboard-page-header'
import { TradingSettingsView } from '@/features/trading/settings/components/settings.view'
import { tradingSettingsQueries } from '@/features/trading/settings/services/settings.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export const dynamic = 'force-dynamic'

export default async function TradingSettingsPage() {
  const state = await getDehydratedQueries([tradingSettingsQueries.list()])

  return (
    <>
      <DashboardPageHeader title="자동 거래 관리" />
      <Hydrate state={state}>
        <TradingSettingsView />
      </Hydrate>
    </>
  )
}
