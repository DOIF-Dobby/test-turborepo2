import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { TradingParameterForm } from './parameter.form'

type Props = {
  tradingSettingId: number
}

export function TradingParameterAddModal({
  tradingSettingId,
  disclosure,
}: PropsWithDisclosure<Props>) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>파라미터 추가</Modal.Title>
        <Modal.Description>파라미터를 추가합니다.</Modal.Description>
      </Frame>
      <Frame>
        <TradingParameterForm
          tradingSettingId={tradingSettingId}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
