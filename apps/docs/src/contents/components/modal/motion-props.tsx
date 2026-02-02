'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { useState } from 'react'

export default function MotionProps() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        motionProps={{
          initial: {
            y: 500,
            opacity: 0,
          },
          transition: {
            type: 'spring',
            bounce: 0.5,
            duration: 0.2,
          },
        }}
      >
        <Frame>Modal Content</Frame>
      </Modal>
    </>
  )
}
