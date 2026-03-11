'use client'

import { Toggle } from '@repo/ui/components/toggle'
import { useState } from 'react'

export default function Controlled() {
  const [pressed, setPressed] = useState(false)

  return (
    <div>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        Toggle
      </Toggle>

      <div>pressed : {String(pressed)}</div>
    </div>
  )
}
