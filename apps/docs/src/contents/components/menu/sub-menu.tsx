import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'

export default function SubMenu() {
  return (
    <Menu>
      <Menu.Trigger>
        <Button>Press me</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Sub>
          <Menu.SubTrigger>Sub Menu</Menu.SubTrigger>
          <Menu.Content
            align="start"
            side="right"
            showArrow={false}
            sideOffset={10}
          >
            <Menu.Item>item 1</Menu.Item>
            <Menu.Item>item 2</Menu.Item>
            <Menu.Item>item 3</Menu.Item>
          </Menu.Content>
        </Menu.Sub>
        <Menu.Item>item 1</Menu.Item>
        <Menu.Item>item 2</Menu.Item>
        <Menu.Item>item 3</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
