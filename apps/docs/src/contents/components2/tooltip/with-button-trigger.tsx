import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components2/tooltip'

export default function WithButtonTrigger() {
  return (
    <Tooltip content="Tooltip content">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
