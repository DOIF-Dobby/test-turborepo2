import type { UseDisclosureReturn } from '@repo/hooks/use-disclosure'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { AlgorithmForm } from './algorithm.form'

interface AlgorithmAddModalProps {
  modalState: UseDisclosureReturn
}

export function AlgorithmAddModal({ modalState }: AlgorithmAddModalProps) {
  return (
    <Modal open={modalState.isOpen} onOpenChange={modalState.onOpenChange}>
      <Frame>
        <Modal.Title>알고리즘 추가</Modal.Title>
        <Modal.Description>알고리즘을 추가할 수 있습니다.</Modal.Description>
      </Frame>
      <Frame>
        <AlgorithmForm onSuccess={modalState.close} />
      </Frame>
    </Modal>
  )
}
