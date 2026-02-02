'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal, type ModalProps } from '@repo/ui/components/modal'
import { useState } from 'react'

const sizes: ModalProps['size'][] = ['sm', 'md', 'lg']

export default function Sizes() {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<ModalProps['size']>('md')

  return (
    <>
      <div className="gap-sw-sm flex">
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => {
              setSize(size)
              setOpen(true)
            }}
          >
            {size}
          </Button>
        ))}
      </div>

      <Modal
        size={size}
        open={open}
        onOpenChange={setOpen}
        title="Modal Title"
        description="Modal Description"
      >
        <Frame>Modal Content</Frame>
      </Modal>
    </>
  )
}
