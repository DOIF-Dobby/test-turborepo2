'use client'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { useControllableState } from '@repo/hooks/use-controllable-state'

export interface PopoverRootProps<Payload> extends React.ComponentProps<
  typeof PopoverPrimitive.Root<Payload>
> {
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
}

export function PopoverRoot<Payload>(props: PopoverRootProps<Payload>) {
  const {
    children,
    defaultOpen,
    open: openProp,
    onOpenChange,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    ...otherProps
  } = props

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
  })

  return (
    <PopoverPrimitive.Root
      {...otherProps}
      open={open}
      onOpenChange={(open, eventDeatils) => {
        if (!open && !closeOnEscape && eventDeatils.reason === 'escape-key') {
          return
        }

        if (
          !open &&
          !closeOnOutsideClick &&
          (eventDeatils.reason === 'outside-press' ||
            eventDeatils.reason === 'focus-out')
        ) {
          return
        }

        onOpenChange?.(open, eventDeatils)

        setOpen(open)
      }}
    >
      {children}
    </PopoverPrimitive.Root>
  )
}
