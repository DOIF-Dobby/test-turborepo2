import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { MarketInstrumentResponse } from '../services/market-instrument.api'
import { MarketInstrumentForm } from './market-instrument.form'

type Props = {
  data?: MarketInstrumentResponse
}

export function MarketInstrumentEditModal({
  disclosure,
  data,
}: PropsWithDisclosure<Props>) {
  if (!data) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>월물 코드 수정</Modal.Title>
        <Modal.Description>월물 코드를 수정할 수 있습니다.</Modal.Description>
      </Frame>
      <Frame>
        <MarketInstrumentForm onSuccess={disclosure.close} initialData={data} />
      </Frame>
    </Modal>
  )
}
