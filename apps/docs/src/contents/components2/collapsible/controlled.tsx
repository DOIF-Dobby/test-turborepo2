'use client'

import { Collapsible } from '@repo/ui/components2/collapsible'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-sw-sm flex">
      <Collapsible open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger>Trigger</Collapsible.Trigger>
        <Collapsible.Panel>Panel</Collapsible.Panel>
      </Collapsible>

      <div>{open ? '열림' : '닫힘'}</div>
    </div>
  )
}
