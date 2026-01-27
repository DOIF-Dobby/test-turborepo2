import { Popover as PopoverPrimitive } from 'radix-ui'

export function Popover(props: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverTrigger(props: PopoverPrimitive.PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger {...props} />
}
