'use client'

import { Checkbox } from '@repo/ui/components2/checkbox'
import { useState } from 'react'

export default function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <>
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Controlled
      </Checkbox>
      <p>checked: {String(checked)}</p>
    </>
  )
}
