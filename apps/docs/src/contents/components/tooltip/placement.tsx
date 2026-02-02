import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components/tooltip'

const sides = ['top', 'bottom', 'left', 'right'] as const
const aligns = ['start', 'center', 'end'] as const

export default function Placement() {
  return (
    <div className="gap-sw-xl flex">
      {aligns.map((align) => (
        <div key={align} className="gap-sw-xl flex flex-col">
          {sides.map((side) => (
            <Tooltip
              key={`${side}-${align}`}
              content={`${side}-${align}`}
              side={side}
              align={align}
            >
              <Button>{`${side}-${align}`}</Button>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  )
}
