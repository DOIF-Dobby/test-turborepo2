'use client'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { Slot } from '@radix-ui/react-slot'

export function PopoverTrigger<Payload>(
  props: React.ComponentProps<typeof PopoverPrimitive.Trigger<Payload>>,
) {
  const { children, render, ...otherProps } = props

  return (
    <PopoverPrimitive.Trigger
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
