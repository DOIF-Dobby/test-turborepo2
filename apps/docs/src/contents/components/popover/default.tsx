import { Frame } from '@repo/ui/components/frame'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'

export default function Default() {
  return (
    <Popover>
      <PopoverTrigger>Trigger</PopoverTrigger>
      <PopoverContent>
        <Frame>Content</Frame>
        <Frame>Content</Frame>
        <Frame>Content</Frame>
      </PopoverContent>
    </Popover>
  )
}
