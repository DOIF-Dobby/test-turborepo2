'use client'

import { useTradingSettings } from '../services/settings.hooks'
import { SettingsActivationModal } from './settings.activation-modal'
import { SettingsDeactivationModal } from './settings.deactivation-modal'
import { SettingsHedgingSection } from './settings.hedging-section'
import { SettingsNormalSection } from './settings.normal-section'

export function TradingSettingsView() {
  const { data = [], isLoading } = useTradingSettings()

  return (
    <>
      <div className="flex flex-col gap-sw-xl">
        <SettingsHedgingSection data={data} isLoading={isLoading} />
        <SettingsNormalSection data={data} isLoading={isLoading} />
      </div>

      <SettingsActivationModal />
      <SettingsDeactivationModal />
    </>
  )
}
