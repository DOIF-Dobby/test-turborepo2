import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components2/tooltip'

export default function Delay() {
  return (
    <Tooltip content="Tooltip content" delay={1000} closeDelay={1000}>
      <Button>Hover me</Button>
    </Tooltip>
  )
}
