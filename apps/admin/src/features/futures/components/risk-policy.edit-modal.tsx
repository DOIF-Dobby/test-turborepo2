import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { FuturesRiskPolicyResponse } from '../services/futures.api'
import { RiskPolicyForm } from './risk-policy.form'

type Props = {
  data?: FuturesRiskPolicyResponse
}

export function RiskPolicyEditModal({
  disclosure,
  data,
}: PropsWithDisclosure<Props>) {
  if (!data) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>청산 안전율 수정</Modal.Title>
        <Modal.Description>청산 안전율을 수정합니다.</Modal.Description>
      </Frame>
      <Frame>
        <RiskPolicyForm
          initialData={data}
          onSuccess={() => disclosure.close()}
        />
      </Frame>
    </Modal>
  )
}
