import type { UseDisclosureReturn } from '@repo/hooks/use-disclosure'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { AlgorithmResponse } from '../api'
import { AlgorithmForm } from './algorithm-form'

interface AlgorithmEditModalProps {
  modalState: UseDisclosureReturn
  data?: AlgorithmResponse
}

export function AlgorithmEditModal({
  modalState,
  data,
}: AlgorithmEditModalProps) {
  if (!data) {
    return null
  }

  return (
    <Modal open={modalState.isOpen} onOpenChange={modalState.onOpenChange}>
      <Frame>
        <Modal.Title>알고리즘 수정</Modal.Title>
        <Modal.Description>
          알고리즘 정보를 수정할 수 있습니다.
        </Modal.Description>
      </Frame>
      <Frame>
        <AlgorithmForm initialData={data} onSuccess={modalState.close} />
      </Frame>
    </Modal>
  )
}
