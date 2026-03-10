import type { Currency } from '@/constants/domain'
import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { MarketInstrumentForm } from './market-instrument.form'

type Props = {
  existingCurrencies: Currency[]
}

export function MarketInstrumentAddModal({
  disclosure,
  existingCurrencies,
}: PropsWithDisclosure<Props>) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>월물 코드 추가</Modal.Title>
        <Modal.Description>
          월물 코드를 추가할 수 있습니다. 중복된 통화의 경우 추가할 수 없습니다.
        </Modal.Description>
      </Frame>
      <Frame>
        <MarketInstrumentForm
          onSuccess={disclosure.close}
          existingCurrencies={existingCurrencies}
        />
      </Frame>
    </Modal>
  )
}
