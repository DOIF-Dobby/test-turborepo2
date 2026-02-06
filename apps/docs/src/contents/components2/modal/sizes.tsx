'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components2/modal'
import { useState } from 'react'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<(typeof sizes)[number]>('md')

  return (
    <>
      <div className="gap-sw-md flex">
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => {
              setSize(size)
              setOpen(true)
            }}
          >
            Open {size}
          </Button>
        ))}
      </div>

      <Modal open={open} onOpenChange={setOpen} size={size}>
        <Frame>
          <Modal.Title>Title</Modal.Title>
          <Modal.Description>Description</Modal.Description>
        </Frame>
        <Frame>This is modal content</Frame>
      </Modal>
    </>
  )
}
