'use client'

import { Checkbox, type CheckedState } from '@repo/ui/components/checkbox'
import { useState } from 'react'

export default function Controlled() {
  const [checked, setChecked] = useState<CheckedState>(true)

  return (
    <>
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Controlled
      </Checkbox>
      <p>checked: {String(checked)}</p>
    </>
  )
}
