import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'

export default function Default() {
  return (
    <Modal trigger={<Modal.Trigger>Open Modal</Modal.Trigger>}>
      <Frame>This is modal content</Frame>
    </Modal>
  )
}
