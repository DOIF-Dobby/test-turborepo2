import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Popover } from '@repo/ui/components/popover'

export default function CloseOnOutsideClick() {
  return (
    <Popover closeOnOutsideClick={false}>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Frame>Content</Frame>
      </Popover.Content>
    </Popover>
  )
}
