'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { useState } from 'react'

export default function CloseOnOutsideClick() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Modal Title"
        description="Modal Description"
        closeOnOutsideClick={false}
      >
        <Frame>Modal Content</Frame>
      </Modal>
    </>
  )
}
