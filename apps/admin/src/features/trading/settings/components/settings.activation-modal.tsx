import type { Currency } from '@/constants/domain'
import { Frame } from '@repo/ui/components/frame'
import { Modal, type ModalHandle } from '@repo/ui/components/modal'
import { Paragraph2 } from '@repo/ui/components/typography'
import { SettingsActivationForm } from './settings.activation-form'

type SettingsActivationModaHandleProps = {
  tradingSettingId: number
  algorithmName: string
  currency: Currency
}

export const settingsActivationModalHandle: ModalHandle<SettingsActivationModaHandleProps> =
  Modal.createHandle<SettingsActivationModaHandleProps>()

export function TradingSettingsActivationModal() {
  return (
    <Modal handle={settingsActivationModalHandle}>
      {({ payload }) => {
        if (!payload) {
          return null
        }

        const { tradingSettingId, algorithmName, currency } = payload

        return (
          <>
            <Frame>
              <Modal.Title>자동 거래 활성화</Modal.Title>
              <Modal.Description
                render={
                  <div>
                    <Paragraph2>통화: {currency}</Paragraph2>
                    <Paragraph2>알고리즘: {algorithmName}</Paragraph2>
                  </div>
                }
              />
            </Frame>
            <Frame>
              <SettingsActivationForm
                currency={currency}
                tradingSettingId={tradingSettingId}
                onSuccess={() => settingsActivationModalHandle.close()}
              />
            </Frame>
          </>
        )
      }}
    </Modal>
  )
}
