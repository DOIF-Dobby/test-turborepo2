import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'

export default function CloseOnEscape() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent closeOnEscape={false}>
        <Frame>Content</Frame>
        <Frame>Content</Frame>
        <Frame>Content</Frame>
      </PopoverContent>
    </Popover>
  )
}
