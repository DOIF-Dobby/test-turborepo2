'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="gap-sw-md flex flex-col">
        <Button onPress={() => setOpen(true)} className="w-fit">
          Open Modal
        </Button>
        <div>{open ? 'Open' : 'Close'}</div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <Frame>
          <Modal.Title>Title</Modal.Title>
          <Modal.Description>Description</Modal.Description>
        </Frame>
        <Frame>This is modal content</Frame>
      </Modal>
    </>
  )
}
