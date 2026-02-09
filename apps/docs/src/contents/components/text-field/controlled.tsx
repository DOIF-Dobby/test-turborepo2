'use client'

import { TextField } from '@repo/ui/components/text-field'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('Hello')

  return (
    <div className="gap-sw-md flex flex-col">
      <TextField
        label="Controoled"
        value={value}
        onValueChange={(value) => setValue(value)}
      />
      <p>입력한 값: {value}</p>
    </div>
  )
}
