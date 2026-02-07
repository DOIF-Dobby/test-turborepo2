'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Popover } from '@repo/ui/components/popover'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-sw-md flex">
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Frame>Content</Frame>
        </Popover.Content>
      </Popover>

      <div>{open ? 'Open' : 'Closed'}</div>
    </div>
  )
}
