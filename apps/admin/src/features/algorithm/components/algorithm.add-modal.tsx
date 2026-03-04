import type { PropsWithDisclosure } from '@/types/ui'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { AlgorithmForm } from './algorithm.form'

export function AlgorithmAddModal({ disclosure }: PropsWithDisclosure) {
  return (
    <Modal open={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <Frame>
        <Modal.Title>알고리즘 추가</Modal.Title>
        <Modal.Description>알고리즘을 추가할 수 있습니다.</Modal.Description>
      </Frame>
      <Frame>
        <AlgorithmForm onSuccess={disclosure.close} />
      </Frame>
    </Modal>
  )
}
