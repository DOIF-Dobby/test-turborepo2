import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { TradingSettingsForm } from './settings.form'

export function TradingSettingsAddModal({ disclosure }: PropsWithDisclosure) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>자동 거래 설정 추가</Modal.Title>
        <Modal.Description>
          자동 거래 설정 정보를 추가할 수 있습니다.
        </Modal.Description>
      </Frame>
      <Frame>
        <TradingSettingsForm onSuccess={disclosure.close} />
      </Frame>
    </Modal>
  )
}
