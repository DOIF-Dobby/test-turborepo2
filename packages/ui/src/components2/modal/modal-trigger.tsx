'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Slot } from '@radix-ui/react-slot'
import type { ModalTriggerVariants } from './variants'

type Props<Payload> = Omit<
  React.ComponentProps<typeof DialogPrimitive.Trigger<Payload>>,
  keyof ModalTriggerVariants
> &
  ModalTriggerVariants

export interface ModalTriggerProps<Payload> extends Props<Payload> {}

export function ModalTrigger<Payload>(props: ModalTriggerProps<Payload>) {
  const { children, render, ...otherProps } = props

  return (
    <DialogPrimitive.Trigger
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
