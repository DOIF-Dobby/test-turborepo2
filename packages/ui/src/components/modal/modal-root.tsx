'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Slot } from '@radix-ui/react-slot'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { motion, type MotionProps } from 'motion/react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
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
  disableAnimation?: boolean
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
    disableAnimation = false,
    ...otherProps
  } = props

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
  })

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const slots = modalVariants({ size })

  return (
    <DialogPrimitive.Root
      {...otherProps}
      open={open}
      onOpenChange={(open, eventDeatils) => {
        if (!open && !closeOnEscape && eventDeatils.reason === 'escape-key') {
          return
        }

        onOpenChange?.(open, eventDeatils)

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
                render={(props) => {
                  return (
                    <motion.div
                      {...(props as MotionProps)}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        bounce: 0.5,
                        duration: shouldDisableAnimation ? 0 : 0.5,
                      }}
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
                            className={slots.closeButton({
                              className: classNames?.closeButton,
                            })}
                            render={(props) => {
                              return <Slot {...props}>{closeButton}</Slot>
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  )
                }}
              />
            </DialogPrimitive.Viewport>
          </DialogPrimitive.Portal>
        </>
      )}
    </DialogPrimitive.Root>
  )
}
