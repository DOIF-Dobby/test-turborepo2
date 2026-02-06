'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { useControllableState } from '@repo/hooks/use-controllable-state'

export interface MenuRootProps<Payload> extends React.ComponentProps<
  typeof MenuPrimitive.Root<Payload>
> {
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
}

export function MenuRoot<Payload>(props: MenuRootProps<Payload>) {
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
    onChange: (open) => {
      onOpenChange?.(open, {} as MenuPrimitive.Root.ChangeEventDetails)
    },
  })

  return (
    <MenuPrimitive.Root
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

        setOpen(open)
      }}
    >
      {children}
    </MenuPrimitive.Root>
  )
}
