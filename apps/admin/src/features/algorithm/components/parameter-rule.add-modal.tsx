import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { ParameterRuleForm } from './parameter-rule.form'

interface Props {
  algorithmId?: number
}

export function ParameterRuleAddModal({
  disclosure,
  algorithmId,
}: PropsWithDisclosure<Props>) {
  if (!algorithmId) {
    return null
  }

  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>알고리즘 파라미터 규칙 추가</Modal.Title>
        <Modal.Description>
          알고리즘 파라미터 규칙을 추가할 수 있습니다.
        </Modal.Description>
      </Frame>
      <Frame>
        <ParameterRuleForm
          algorithmId={algorithmId}
          onSuccess={disclosure.close}
        />
      </Frame>
    </Modal>
  )
}
