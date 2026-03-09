'use client'

import { useTradingSettingDetail } from '../services/settings.hooks'
import { TradingSettingDetailInfoSection } from './detail.info-section'
import { TradingSettingParameterSection } from './parameter.section'
import { TradingPeriodLimitSection } from './period-limit.section'
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
        <TradingSettingParameterSection tradingSettingData={data} />

        <div className="flex gap-sw-md">
          <div className="w-3/5">
            <TradingSettingScheduleSection tradingSettingData={data} />
          </div>
          <div className="w-2/5">
            <TradingPeriodLimitSection tradingSettingData={data} />
          </div>
        </div>
      </div>

      <TradingSettingsActivationModal />
      <TradingSettingsDeactivationModal />
    </>
  )
}
