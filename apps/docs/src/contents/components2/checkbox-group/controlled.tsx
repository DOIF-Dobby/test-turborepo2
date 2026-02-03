'use client'

import { Checkbox, CheckboxGroup } from '@repo/ui/components2/checkbox'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string[]>(['apple', 'banana'])

  return (
    <div className="gap-sw-md flex flex-col">
      <CheckboxGroup value={value} onValueChange={setValue}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
      </CheckboxGroup>

      <div>Selected: {value.join(', ')}</div>
    </div>
  )
}
