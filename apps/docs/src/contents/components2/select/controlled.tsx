'use client'

import { Select } from '@repo/ui/components2/select'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string | null>('value1')

  return (
    <div className="gap-sw-md flex">
      <div className="w-1/2">
        <Select value={value} onValueChange={setValue}>
          <Select.Item value="value1">value1</Select.Item>
          <Select.Item value="value2">value2</Select.Item>
          <Select.Item value="value3">value3</Select.Item>
        </Select>
      </div>
      <p>입력한 값: {value}</p>
    </div>
  )
}
