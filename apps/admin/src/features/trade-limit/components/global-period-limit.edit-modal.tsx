import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { GlobalPeriodLimitResponse } from '../services/global-period-limit.api'
import { GlobalPeriodLimitForm } from './global-period-limit.form'

type Props = {
  data?: GlobalPeriodLimitResponse
}

export function GlobalPeriodLimitEditModal({
  disclosure,
  data,
}: PropsWithDisclosure<Props>) {
  if (!data) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>전역 기간 제한 수정</Modal.Title>
        <Modal.Description>전역 기간 제한을 수정합니다.</Modal.Description>
      </Frame>
      <Frame>
        <GlobalPeriodLimitForm
          initialData={data}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
