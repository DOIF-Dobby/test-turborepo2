import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { TradingSettingParameterResponse } from '../services/parameter.api'
import { TradingParameterForm } from './parameter.form'

interface Props {
  tradingSettingId: number
  data?: TradingSettingParameterResponse
}

export function TradingParameterEditModal({
  tradingSettingId,
  data,
  disclosure,
}: PropsWithDisclosure<Props>) {
  if (!data) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>파라미터 수정</Modal.Title>
        <Modal.Description>파라미터를 수정합니다.</Modal.Description>
      </Frame>
      <Frame>
        <TradingParameterForm
          tradingSettingId={tradingSettingId}
          initialData={data}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
