'use client'

import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components/tooltip'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-sw-sm">
      <Tooltip content="Tooltip content" open={open} onOpenChange={setOpen}>
        <Button>Hover me</Button>
      </Tooltip>

      <div>{open ? 'open' : 'close'}</div>
    </div>
  )
}
