'use client'

import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components/tooltip'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-sw-md flex">
      <Tooltip content="Tooltip content" open={open} onOpenChange={setOpen}>
        <Button>Hover me</Button>
      </Tooltip>
      <div>{open ? 'Open' : 'Closed'}</div>
    </div>
  )
}
