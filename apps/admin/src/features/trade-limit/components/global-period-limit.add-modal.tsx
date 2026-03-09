import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { GlobalPeriodLimitForm } from './global-period-limit.form'

export function GlobalPeriodLimitAddModal({ disclosure }: PropsWithDisclosure) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>전역 기간 제한 추가</Modal.Title>
        <Modal.Description>전역 기간 제한을 추가합니다.</Modal.Description>
      </Frame>
      <Frame>
        <GlobalPeriodLimitForm onSuccess={() => disclosure.close()} />
      </Frame>
    </Modal>
  )
}
