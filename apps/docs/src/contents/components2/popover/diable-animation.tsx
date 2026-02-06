import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Popover } from '@repo/ui/components2/popover'

export default function DisableAnimation() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content disableAnimation>
        <Frame>Content</Frame>
      </Popover.Content>
    </Popover>
  )
}
