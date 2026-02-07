import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components/tooltip'

export default function WithButtonTrigger() {
  return (
    <Tooltip content="Tooltip content">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
