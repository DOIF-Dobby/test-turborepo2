'use client'

import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'
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
    <div className="gap-sw-md flex">
      <Menu>
        <Menu.Trigger>
          <Button>Press me</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Group>
            {items.map((item) => (
              <Menu.CheckboxItem
                key={item.id}
                checked={values.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleCheckedChange(item.id, checked)
                }
              >
                {item.label}
              </Menu.CheckboxItem>
            ))}
          </Menu.Group>
        </Menu.Content>
      </Menu>

      <div>values: {values.join(', ')}</div>
    </div>
  )
}
