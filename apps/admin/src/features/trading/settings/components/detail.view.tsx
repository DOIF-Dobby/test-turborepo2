'use client'

import { useTradingSettingDetail } from '../services/settings.hooks'
import { TradingSettingDetailInfoSection } from './detail.info-section'
import { TradingSettingParameterSection } from './parameter.section'
import { TradingSettingScheduleSection } from './schedule.section'
import { TradingSettingsActivationModal } from './settings.activation-modal'
import { TradingSettingsDeactivationModal } from './settings.deactivation-modal'

interface TradingSettingsDetailViewProps {
  tradingSettingId: number
}

export function TradingSettingsDetailView({
  tradingSettingId,
}: TradingSettingsDetailViewProps) {
  const { data } = useTradingSettingDetail(tradingSettingId)

  if (!data) {
    return null
  }

  return (
    <>
      <div className="flex flex-col gap-sw-md">
        <TradingSettingDetailInfoSection tradingSettingData={data} />
        <TradingSettingScheduleSection tradingSettingData={data} />
        <TradingSettingParameterSection tradingSettingData={data} />
      </div>

      <TradingSettingsActivationModal />
      <TradingSettingsDeactivationModal />
    </>
  )
}
