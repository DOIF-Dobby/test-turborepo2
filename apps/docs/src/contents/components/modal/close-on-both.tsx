import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'

export default function CloseOnBoth() {
  return (
    <Modal
      closeOnEscape={false}
      closeOnOutsideClick={false}
      trigger={
        <Modal.Trigger>
          <Button>Open Modal</Button>
        </Modal.Trigger>
      }
    >
      <Frame>
        <Modal.Title>Title</Modal.Title>
        <Modal.Description>Description</Modal.Description>
      </Frame>
      <Frame>This is modal content</Frame>
    </Modal>
  )
}
