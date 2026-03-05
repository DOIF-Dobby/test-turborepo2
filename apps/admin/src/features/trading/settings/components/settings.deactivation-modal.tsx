import type { Currency } from '@/constants/domain'
import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal, type ModalHandle } from '@repo/ui/components/modal'
import { Paragraph2 } from '@repo/ui/components/typography'
import { safePromise } from '@repo/utils/promise'
import { useDeactivateTradingSetting } from '../services/settings.hooks'

type SettingsDeactivationModaHandleProps = {
  tradingSettingId: number
  algorithmName: string
  currency: Currency
}

export const settingsDeactivationModalHandle: ModalHandle<SettingsDeactivationModaHandleProps> =
  Modal.createHandle<SettingsDeactivationModaHandleProps>()

export function SettingsDeactivationModal() {
  const deactivate = useDeactivateTradingSetting()

  return (
    <Modal handle={settingsDeactivationModalHandle}>
      {({ payload }) => {
        if (!payload) {
          return null
        }

        const { tradingSettingId, algorithmName, currency } = payload

        return (
          <>
            <Frame>
              <Modal.Title>자동 거래 비활성화</Modal.Title>
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
              <Button
                color="destructive"
                isLoading={deactivate.isPending}
                onPress={async () => {
                  const result = await safePromise(
                    deactivate.mutateAsync(tradingSettingId),
                  )
                  if (result) {
                    settingsDeactivationModalHandle.close()
                  }
                }}
              >
                비활성화
              </Button>
            </Frame>
          </>
        )
      }}
    </Modal>
  )
}
