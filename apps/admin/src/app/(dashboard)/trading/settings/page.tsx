import { DashboardPageHeader } from '@/components/layout/dashboard-page-header'
import { TradingSettingsView } from '@/features/trading/settings/components/settings.view'

export const dynamic = 'force-dynamic'

export default async function TradingSettingsPage() {
  return (
    <>
      <DashboardPageHeader title="자동 거래 관리" />
      <TradingSettingsView />
    </>
  )
}
