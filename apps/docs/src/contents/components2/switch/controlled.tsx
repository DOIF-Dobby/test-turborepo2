'use client'

import { Switch } from '@repo/ui/components2/switch'
import { useState } from 'react'

export default function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <div>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <p>{checked ? 'Checked' : 'Unchecked'}</p>
    </div>
  )
}
