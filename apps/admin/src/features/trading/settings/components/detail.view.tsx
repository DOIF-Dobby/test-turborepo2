'use client'

import { TradingSettingDetailInfoSection } from './detail.info-section'
import { SettingsActivationModal } from './settings.activation-modal'
import { SettingsDeactivationModal } from './settings.deactivation-modal'

interface TradingSettingsDetailViewProps {
  tradingSettingId: number
}

export function TradingSettingsDetailView({
  tradingSettingId,
}: TradingSettingsDetailViewProps) {
  return (
    <>
      <TradingSettingDetailInfoSection tradingSettingId={tradingSettingId} />

      <SettingsActivationModal />
      <SettingsDeactivationModal />
    </>
  )
}
