import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { TradingPeriodLimitResponse } from '../services/period-limit.api'
import { TradingPeriodLimitForm } from './period-limit.form'

interface Props {
  tradingSettingId: number
  data?: TradingPeriodLimitResponse
}

export function TradingPeriodLimitEditModal({
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
        <Modal.Title>기간 제한 수정</Modal.Title>
        <Modal.Description>기간 제한을 수정합니다.</Modal.Description>
      </Frame>
      <Frame>
        <TradingPeriodLimitForm
          tradingSettingId={tradingSettingId}
          initialData={data}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
