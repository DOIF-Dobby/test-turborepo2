'use client'

import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components2/menu'

export default function DisableAnimation() {
  return (
    <Menu>
      <Menu.Trigger>
        <Button>Press me</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onClick={() => alert('item 1')}>item 1</Menu.Item>
        <Menu.Item disabled onClick={() => alert('item 2')}>
          item 2
        </Menu.Item>
        <Menu.Item onClick={() => alert('item 3')}>item 3</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
