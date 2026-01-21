'use client'

import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string[]>(['value-1', 'value-2'])

  return (
    <div className="gap-sw-md flex flex-col">
      <CheckboxGroup value={value} onValueChange={setValue}>
        <Checkbox value="value-1">Option 1</Checkbox>
        <Checkbox value="value-2">Option 2</Checkbox>
        <Checkbox value="value-3">Option 3</Checkbox>
      </CheckboxGroup>
      <div>{value.join(', ')}</div>
    </div>
  )
}
