'use client'

import { useTradingSettings } from '../services/settings.hooks'
import { SettingsHedgingSection } from './settings-hedging.section'
import { SettingsNormalSection } from './settings-normal.section'

export function TradingSettingsView() {
  const { data = [], isLoading } = useTradingSettings()

  return (
    <>
      <SettingsHedgingSection data={data} isLoading={isLoading} />
      <SettingsNormalSection data={data} isLoading={isLoading} />
    </>
  )
}
