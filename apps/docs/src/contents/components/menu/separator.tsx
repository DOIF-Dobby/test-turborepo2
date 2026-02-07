import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'

export default function Separator() {
  return (
    <Menu>
      <Menu.Trigger>
        <Button>Press me</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Group 1</Menu.GroupLabel>
          <Menu.Item>item 1</Menu.Item>
          <Menu.Item>item 2</Menu.Item>
          <Menu.Item>item 3</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Group 2</Menu.GroupLabel>
          <Menu.Item>item 4</Menu.Item>
          <Menu.Item>item 5</Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  )
}
