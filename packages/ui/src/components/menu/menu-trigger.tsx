'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Slot } from '@radix-ui/react-slot'

export function MenuTrigger<Payload>(
  props: React.ComponentProps<typeof MenuPrimitive.Trigger<Payload>>,
) {
  const { children, render, ...otherProps } = props

  return (
    <MenuPrimitive.Trigger
      {...otherProps}
      suppressHydrationWarning
      render={
        render
          ? render
          : (props) => {
              if (typeof children === 'string') {
                return <button {...props}>{children}</button>
              }

              return <Slot {...props}>{children}</Slot>
            }
      }
    />
  )
}
