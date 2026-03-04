import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { AlgorithmParameterRuleResponse } from '../services/parameter-rule.api'
import { ParameterRuleForm } from './parameter-rule.form'

interface Props {
  data?: AlgorithmParameterRuleResponse
  algorithmId?: number
}

export function ParameterRuleEditModal({
  disclosure,
  data,
  algorithmId,
}: PropsWithDisclosure<Props>) {
  if (!data || !algorithmId) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>알고리즘 파라미터 규칙 수정</Modal.Title>
        <Modal.Description>
          알고리즘 파라미터 규칙을 수정할 수 있습니다.
        </Modal.Description>
      </Frame>
      <Frame>
        <ParameterRuleForm
          algorithmId={algorithmId}
          initialData={data}
          onSuccess={disclosure.close}
        />
      </Frame>
    </Modal>
  )
}
