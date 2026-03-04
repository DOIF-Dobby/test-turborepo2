import { Menu } from '@repo/ui/components/menu'
import { Menubar } from '@repo/ui/components/menubar'

export default function Default() {
  return (
    <Menubar className="flex gap-sw-2xs">
      <Menu>
        <Menu.Trigger>Menu1</Menu.Trigger>
        <Menu.Content disableAnimation>
          <Menu.Item>Menu1-1</Menu.Item>
          <Menu.Item>Menu1-2</Menu.Item>
          <Menu.Item>Menu1-3</Menu.Item>
        </Menu.Content>
      </Menu>
      <Menu>
        <Menu.Trigger>Menu2</Menu.Trigger>
        <Menu.Content disableAnimation>
          <Menu.Item>Menu2-1</Menu.Item>
          <Menu.Item>Menu2-2</Menu.Item>
          <Menu.Item>Menu2-3</Menu.Item>
        </Menu.Content>
      </Menu>
      <Menu>
        <Menu.Trigger>Menu3</Menu.Trigger>
        <Menu.Content disableAnimation>
          <Menu.Item>Menu3-1</Menu.Item>
          <Menu.Item>Menu3-2</Menu.Item>
          <Menu.Item>Menu3-3</Menu.Item>
        </Menu.Content>
      </Menu>
    </Menubar>
  )
}
