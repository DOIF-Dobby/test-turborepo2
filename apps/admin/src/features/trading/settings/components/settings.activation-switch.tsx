import type { Currency } from '@/constants/domain'
import { Modal } from '@repo/ui/components/modal'
import { Switch } from '@repo/ui/components/switch'
import { settingsActivationModalHandle } from './settings.activation-modal'
import { settingsDeactivationModalHandle } from './settings.deactivation-modal'

interface TradingSettingsActivationSwitchProps {
  isActive: boolean
  tradingSettingId: number
  algorithmName: string
  currency: Currency
}

export function TradingSettingsActivationSwitch({
  isActive,
  algorithmName,
  currency,
  tradingSettingId,
}: TradingSettingsActivationSwitchProps) {
  if (isActive) {
    return (
      <Modal.Trigger
        handle={settingsDeactivationModalHandle}
        payload={{
          tradingSettingId,
          algorithmName,
          currency,
        }}
      >
        <Switch size="sm" checked={isActive} />
      </Modal.Trigger>
    )
  }

  return (
    <Modal.Trigger
      handle={settingsActivationModalHandle}
      payload={{ tradingSettingId, algorithmName, currency }}
    >
      <Switch size="sm" checked={isActive} />
    </Modal.Trigger>
  )
}
