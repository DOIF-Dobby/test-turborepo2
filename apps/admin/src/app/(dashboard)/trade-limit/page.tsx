import { DashboardPageHeader } from '@/components/layout/dashboard-page-header'
import { TradeLimitView } from '@/features/trade-limit/components/trade-limit.view'

export const dynamic = 'force-dynamic'

export default async function TradeLimitPage() {
  return (
    <>
      <DashboardPageHeader title="거래 제한" />
      <TradeLimitView />
    </>
  )
}
