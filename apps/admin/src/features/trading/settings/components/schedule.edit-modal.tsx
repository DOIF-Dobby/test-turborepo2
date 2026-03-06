import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { TradingScheduleResponse } from '../services/schedule.api'
import { TradingScheduleForm } from './schedule.form'

interface Props {
  tradingSettingId: number
  data?: TradingScheduleResponse
}

export function TradingScheduleEditModal({
  tradingSettingId,
  disclosure,
  data,
}: PropsWithDisclosure<Props>) {
  if (!data) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>자동 거래 스케줄 수정</Modal.Title>
        <Modal.Description>자동 거래 스케줄을 수정합니다.</Modal.Description>
      </Frame>
      <Frame>
        <TradingScheduleForm
          tradingSettingId={tradingSettingId}
          initialData={data}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
