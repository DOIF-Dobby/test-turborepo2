'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Slot } from '@radix-ui/react-slot'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { DefaultModalCloseButton } from './default-modal-close-button'
import { modalVariants, type ModalSlots, type ModalVariants } from './variants'

type Props<Payload> = Omit<
  React.ComponentProps<typeof DialogPrimitive.Root<Payload>>,
  keyof ModalVariants | 'disablePointerDismissal'
> &
  ModalVariants

export interface ModalRootProps<Payload> extends Props<Payload> {
  classNames?: SlotsToClasses<ModalSlots>
  trigger?: React.ReactNode
  closeButton?: React.ReactNode
  showCloseButton?: boolean
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
}

export function ModalRoot<Payload>(props: ModalRootProps<Payload>) {
  const {
    defaultOpen,
    open: openProp,
    onOpenChange,
    children,
    size,
    classNames,
    trigger,
    closeButton = <DefaultModalCloseButton />,
    showCloseButton = true,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    ...otherProps
  } = props

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: (open) => {
      onOpenChange?.(open, {} as DialogPrimitive.Root.ChangeEventDetails)
    },
  })

  const slots = modalVariants({ size })

  return (
    <DialogPrimitive.Root
      {...otherProps}
      open={open}
      onOpenChange={(open, eventDeatils) => {
        if (!open && !closeOnEscape && eventDeatils.reason === 'escape-key') {
          return
        }

        setOpen(open)
      }}
      disablePointerDismissal={!closeOnOutsideClick}
    >
      {({ payload }) => (
        <>
          {trigger}
          <DialogPrimitive.Portal suppressHydrationWarning>
            <DialogPrimitive.Backdrop
              suppressHydrationWarning
              className={swClsx(
                slots.overlay({ className: classNames?.overlay }),
              )}
            />
            <DialogPrimitive.Viewport suppressHydrationWarning>
              <DialogPrimitive.Popup
                finalFocus={false}
                suppressContentEditableWarning
                className={swClsx(
                  slots.content({ className: classNames?.content }),
                )}
              >
                {typeof children === 'function'
                  ? children({ payload })
                  : children}

                {showCloseButton && (
                  <div
                    className={swClsx(
                      slots.closeButtonWrapper({
                        className: classNames?.closeButtonWrapper,
                      }),
                    )}
                  >
                    <DialogPrimitive.Close
                      suppressHydrationWarning
                      tabIndex={closeOnEscape ? -1 : 0}
                      render={(props) => {
                        return <Slot {...props}>{closeButton}</Slot>
                      }}
                    />
                  </div>
                )}
              </DialogPrimitive.Popup>
            </DialogPrimitive.Viewport>
          </DialogPrimitive.Portal>
        </>
      )}
    </DialogPrimitive.Root>
  )
}
