import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components/tooltip'

export default function DelayDuration() {
  return (
    <Tooltip content="Tooltip content" delayDuration={1000}>
      <Button>Hover me</Button>
    </Tooltip>
  )
}
