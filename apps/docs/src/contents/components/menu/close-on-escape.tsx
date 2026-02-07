import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'

export default function CloseOnEscape() {
  return (
    <Menu closeOnEscape={false}>
      <Menu.Trigger>
        <Button>Press me</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>item 1</Menu.Item>
        <Menu.Item>item 2</Menu.Item>
        <Menu.Item>item 3</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
