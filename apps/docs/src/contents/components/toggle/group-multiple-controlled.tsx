'use client'

import { Toggle, ToggleGroup } from '@repo/ui/components/toggle'
import { useState } from 'react'

export default function GroupMultipleControlled() {
  const [value, setValue] = useState(['toggle1'])

  return (
    <div>
      <ToggleGroup value={value} onValueChange={setValue} multiple>
        <Toggle value="toggle1">Toggle 1</Toggle>
        <Toggle value="toggle2">Toggle 2</Toggle>
        <Toggle value="toggle3">Toggle 3</Toggle>
      </ToggleGroup>

      <div>pressed: {value.join(', ')}</div>
    </div>
  )
}
