import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import type { AlgorithmResponse } from '../fetchers'

interface AlgorithmFormModalProps extends React.ComponentProps<typeof Modal> {
  algorithm?: AlgorithmResponse
}

export function AlgorithmFormModal({
  open,
  onOpenChange,
  algorithm,
  ...props
}: AlgorithmFormModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} {...props}>
      <Frame>
        <Modal.Title>
          {algorithm ? '알고리즘 수정' : '알고리즘 추가'}
        </Modal.Title>
        <Modal.Description>
          {algorithm
            ? '알고리즘을 수정할 수 있습니다.'
            : '알고리즘을 추가할 수 있습니다.'}
        </Modal.Description>
      </Frame>
      <Frame>알고리즘 추가</Frame>
    </Modal>
  )
}
