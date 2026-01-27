import { Button } from '@repo/ui/components/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'

export default function Default() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent arrowPadding={50}>Content</PopoverContent>
    </Popover>
  )
}
