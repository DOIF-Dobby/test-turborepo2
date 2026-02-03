'use client'

import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownGroup,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'
import { useState } from 'react'

const items = [
  { id: 'item-1', label: 'item 1' },
  { id: 'item-2', label: 'item 2' },
  { id: 'item-3', label: 'item 3' },
]

export default function CheckboxItem() {
  const [values, setValues] = useState<string[]>(['item-1'])

  const handleCheckedChange = (id: string, checked: boolean) => {
    setValues((prev) => {
      if (checked) {
        return [...prev, id]
      } else {
        return prev.filter((item) => item !== id)
      }
    })
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Press me</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownGroup>
          {items.map((item) => (
            <DropdownCheckboxItem
              key={item.id}
              checked={values.includes(item.id)}
              onCheckedChange={(checked) =>
                handleCheckedChange(item.id, checked)
              }
            >
              {item.label}
            </DropdownCheckboxItem>
          ))}
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  )
}
