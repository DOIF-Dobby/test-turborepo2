import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { TradingScheduleForm } from './schedule.form'

export function TradingScheduleAddModal({ disclosure }: PropsWithDisclosure) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>자동 거래 스케줄 추가</Modal.Title>
        <Modal.Description>자동 거래 스케줄을 추가합니다.</Modal.Description>
      </Frame>
      <Frame>
        <TradingScheduleForm onSuccess={() => disclosure.close()} />
      </Frame>
    </Modal>
  )
}
