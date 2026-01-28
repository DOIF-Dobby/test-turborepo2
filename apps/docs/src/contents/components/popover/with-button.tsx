import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'

export default function WithButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Frame>Content</Frame>
        <Frame>Content</Frame>
        <Frame>Content</Frame>
      </PopoverContent>
    </Popover>
  )
}
