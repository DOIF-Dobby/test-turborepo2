'use client'

import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownContent,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'
import { useState } from 'react'

export default function RadioItem() {
  const [value, setValue] = useState('item-1')

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Press me</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownRadioGroup value={value} onValueChange={setValue}>
          <DropdownRadioItem value="item-1">item 1</DropdownRadioItem>
          <DropdownRadioItem value="item-2">item 2</DropdownRadioItem>
          <DropdownRadioItem value="item-3">item 3</DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownContent>
    </Dropdown>
  )
}
