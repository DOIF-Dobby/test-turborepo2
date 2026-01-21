'use client'

import { Radio, RadioGroup } from '@repo/ui/components/radio-group'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('2')

  return (
    <div className="gap-sw-md flex flex-col">
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
      <div>선택된 값: {value}</div>
    </div>
  )
}
