'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(true)

  return (
    <>
      <span>state: {String(open)}</span>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    </>
  )
}
