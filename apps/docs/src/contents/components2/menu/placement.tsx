import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components2/menu'

const sides = ['top', 'bottom', 'left', 'right'] as const
const aligns = ['start', 'center', 'end'] as const

export default function Placement() {
  return (
    <div className="gap-sw-xl flex">
      {aligns.map((align) => (
        <div key={align} className="gap-sw-xl flex flex-col">
          {sides.map((side) => (
            <Menu key={side}>
              <Menu.Trigger>
                <Button>{`${side}-${align}`}</Button>
              </Menu.Trigger>
              <Menu.Content side={side} align={align}>
                <Menu.Item>item 1</Menu.Item>
                <Menu.Item>item 2</Menu.Item>
                <Menu.Item>item 3</Menu.Item>
              </Menu.Content>
            </Menu>
          ))}
        </div>
      ))}
    </div>
  )
}
