'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-sw-sm flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Frame>Content</Frame>
          <Frame>Content</Frame>
          <Frame>Content</Frame>
        </PopoverContent>
      </Popover>

      <div>open: {open.toString()}</div>
    </div>
  )
}
