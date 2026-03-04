'use client'

import { Collapsible } from '@repo/ui/components/collapsible'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-sw-sm">
      <Collapsible open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger>Trigger</Collapsible.Trigger>
        <Collapsible.Panel>Panel</Collapsible.Panel>
      </Collapsible>

      <div>{open ? '열림' : '닫힘'}</div>
    </div>
  )
}
