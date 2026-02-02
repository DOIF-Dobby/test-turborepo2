import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'

const sides = ['top', 'bottom', 'left', 'right'] as const
const aligns = ['start', 'center', 'end'] as const

export default function Placement() {
  return (
    <div className="gap-sw-xl flex">
      {aligns.map((align) => (
        <div key={align} className="gap-sw-xl flex flex-col">
          {sides.map((side) => (
            <Dropdown key={side}>
              <DropdownTrigger>
                <Button>{`${side}-${align}`}</Button>
              </DropdownTrigger>
              <DropdownContent side={side} align={align}>
                <DropdownItem>item 1</DropdownItem>
                <DropdownItem>item 2</DropdownItem>
                <DropdownItem>item 3</DropdownItem>
              </DropdownContent>
            </Dropdown>
          ))}
        </div>
      ))}
    </div>
  )
}
