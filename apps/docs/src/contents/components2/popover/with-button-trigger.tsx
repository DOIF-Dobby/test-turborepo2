import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Popover } from '@repo/ui/components2/popover'

export default function Default() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Frame>Content</Frame>
      </Popover.Content>
    </Popover>
  )
}
