'use client'

import { Radio, RadioGroup } from '@repo/ui/components2/radio'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('apple')

  return (
    <div className="gap-sw-md flex flex-col">
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
      <div>선택된 값: {value}</div>
    </div>
  )
}
