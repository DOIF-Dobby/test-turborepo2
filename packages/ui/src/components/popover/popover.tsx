import { Popover as PopoverPrimitive } from 'radix-ui'

export function Popover(props: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverArrow(props: PopoverPrimitive.PopoverArrowProps) {
  return <PopoverPrimitive.Arrow {...props} suppressHydrationWarning />
}

export function PopoverClose(props: PopoverPrimitive.PopoverCloseProps) {
  return <PopoverPrimitive.Close {...props} suppressHydrationWarning />
}

export function PopoverAnchor(props: PopoverPrimitive.PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor {...props} suppressHydrationWarning />
}
