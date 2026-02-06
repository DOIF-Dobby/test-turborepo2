import { PopoverContent } from './popover-content'
import { PopoverRoot } from './popover-root'
import { PopoverTrigger } from './popover-trigger'

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
})
