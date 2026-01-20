'use client'

import { Select, SelectItem } from '@repo/ui/components/select'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('value1')

  return (
    <div>
      <Select label="Select" value={value} onValueChange={setValue}>
        <SelectItem value="value1">value1</SelectItem>
        <SelectItem value="value2">value2</SelectItem>
        <SelectItem value="value3">value3</SelectItem>
      </Select>
      <p>입력한 값: {value}</p>
    </div>
  )
}
