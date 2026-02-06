'use client'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { Slot } from '@radix-ui/react-slot'
import { motion, type MotionProps } from 'motion/react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { DefaultArrowSvg } from './default-arrow'
import { DefaultPopoverCloseButton } from './default-popover-close-button'
import {
  popoverContentVariants,
  type PopoverContentSlots,
  type PopoverContentVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Positioner>,
  keyof PopoverContentVariants | 'className'
> &
  PopoverContentVariants

export interface PopoverContentProps extends Props {
  classNames?: SlotsToClasses<PopoverContentSlots>
  showCloseButton?: boolean
  closeButton?: React.ReactNode
  showArrow?: boolean
  arrow?: React.ReactNode
  zIndex?: number
  disableAnimation?: boolean
}

export function PopoverContent(props: PopoverContentProps) {
  const {
    children,
    classNames,
    showCloseButton = false,
    closeButton = <DefaultPopoverCloseButton />,
    showArrow = true,
    arrow = <DefaultArrowSvg />,
    side = 'bottom',
    align = 'start',
    sideOffset = 8,
    zIndex = 50,
    style,
    disableAnimation = false,
    ...otherProps
  } = props

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const slots = popoverContentVariants({})

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        {...otherProps}
        side={side}
        align={align}
        sideOffset={sideOffset}
        style={{
          zIndex,
          ...style,
        }}
      >
        <PopoverPrimitive.Popup
          suppressHydrationWarning
          className={swClsx(slots.content({ className: classNames?.content }))}
          render={(props) => {
            return (
              <motion.div
                {...(props as MotionProps)}
                initial={{
                  opacity: 0,
                  y: 'var(--y-initial, 0px)',
                  x: 'var(--x-initial, 0px)',
                }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  bounce: 0.5,
                  duration: shouldDisableAnimation ? 0 : 0.5,
                }}
              >
                {showArrow && (
                  <PopoverPrimitive.Arrow
                    className={swClsx(
                      slots.arrow({ className: classNames?.arrow }),
                    )}
                  >
                    {arrow}
                  </PopoverPrimitive.Arrow>
                )}
                {children}

                {showCloseButton && (
                  <div
                    className={swClsx(
                      slots.closeButtonWrapper({
                        className: classNames?.closeButtonWrapper,
                      }),
                    )}
                  >
                    <PopoverPrimitive.Close
                      suppressHydrationWarning
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
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}
