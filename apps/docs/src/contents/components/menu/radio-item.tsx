'use client'

import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'
import { useState } from 'react'

export default function RadioItem() {
  const [value, setValue] = useState('item-1')

  return (
    <div className="gap-sw-md flex">
      <Menu>
        <Menu.Trigger>
          <Button>Press me</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.RadioGroup value={value} onValueChange={setValue}>
            <Menu.RadioItem value="item-1">item 1</Menu.RadioItem>
            <Menu.RadioItem value="item-2">item 2</Menu.RadioItem>
            <Menu.RadioItem value="item-3" closeOnClick>
              item 3
            </Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Content>
      </Menu>

      <div>value: {value}</div>
    </div>
  )
}
