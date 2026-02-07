import { Menu } from '@repo/ui/components/menu'

export default function Default() {
  return (
    <Menu>
      <Menu.Trigger>Press me</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>item 1</Menu.Item>
        <Menu.Item>item 2</Menu.Item>
        <Menu.Item>item 3</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
