'use client'

import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-sw-md flex">
      <Menu open={open} onOpenChange={setOpen}>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 3</Menu.Item>
        </Menu.Content>
      </Menu>

      <div>{open ? 'Open' : 'Closed'}</div>
    </div>
  )
}
