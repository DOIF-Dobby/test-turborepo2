import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'

const sides = ['top', 'bottom', 'left', 'right'] as const
const aligns = ['start', 'center', 'end'] as const

export default function Placement() {
  return (
    <div className="gap-sw-xl flex">
      {aligns.map((align) => (
        <div key={align} className="gap-sw-xl flex flex-col">
          {sides.map((side) => (
            <Popover key={side}>
              <PopoverTrigger asChild>
                <Button>{`${side}-${align}`}</Button>
              </PopoverTrigger>
              <PopoverContent side={side} align={align}>
                <Frame>
                  Content {side}-{align}
                </Frame>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      ))}
    </div>
  )
}
