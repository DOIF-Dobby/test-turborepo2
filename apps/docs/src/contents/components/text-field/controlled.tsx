'use client'

import { TextField } from '@repo/ui/components/text-field'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('Hello')

  return (
    <div className="gap-sw-md flex flex-col">
      <div className="gap-sw-md flex">
        <TextField
          label="onChange 방식"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextField
          label="onValueChange 방식"
          value={value}
          onValueChange={(value) => setValue(value)}
        />
      </div>
      <p>입력한 값: {value}</p>
    </div>
  )
}
