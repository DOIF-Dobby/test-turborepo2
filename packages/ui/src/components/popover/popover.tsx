import { Popover as PopoverPrimitive } from 'radix-ui'
import type { PopoverVariants } from './variants'

type Props = Omit<PopoverPrimitive.PopoverProps, keyof PopoverVariants> &
  PopoverVariants

export interface PopoverProps extends Props {}

export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverTrigger(
  props: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger {...props} />
}
