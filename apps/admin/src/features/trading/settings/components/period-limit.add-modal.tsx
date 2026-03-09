import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { TradingPeriodLimitForm } from './period-limit.form'

type Props = {
  tradingSettingId: number
}

export function TradingPeriodLimitAddModal({
  tradingSettingId,
  disclosure,
}: PropsWithDisclosure<Props>) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>기간 제한 추가</Modal.Title>
        <Modal.Description>기간 제한을 추가합니다.</Modal.Description>
      </Frame>
      <Frame>
        <TradingPeriodLimitForm
          tradingSettingId={tradingSettingId}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
