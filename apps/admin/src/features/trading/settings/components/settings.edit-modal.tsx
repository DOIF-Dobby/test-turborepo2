import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { TradingSettingsForm } from './settings.form'

interface Props {
  data?: TradingSettingWithAlgorithmResponse
}

export function TradingSettingsEditModal({
  disclosure,
  data,
}: PropsWithDisclosure<Props>) {
  if (!data) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>자동 거래 설정 수정</Modal.Title>
        <Modal.Description>
          자동 거래 설정 정보를 수정할 수 있습니다.
        </Modal.Description>
      </Frame>
      <Frame>
        <TradingSettingsForm initialData={data} onSuccess={disclosure.close} />
      </Frame>
    </Modal>
  )
}
