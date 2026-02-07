import { Frame } from '@repo/ui/components/frame'
import { Popover } from '@repo/ui/components/popover'

export default function Default() {
  return (
    <Popover>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Content>
        <Frame>Content</Frame>
      </Popover.Content>
    </Popover>
  )
}
