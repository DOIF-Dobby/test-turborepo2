'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  popoverContentVariants,
  type PopoverContentSlots,
  type PopoverContentVariants,
} from './variants'

type ContentProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Content>,
  keyof PopoverContentVariants | 'className'
> &
  PopoverContentVariants &
  PopoverPrimitive.PopoverPortalProps

export interface PopoverContentProps extends ContentProps {
  showArrow?: boolean
  classNames?: SlotsToClasses<PopoverContentSlots>
  zIndex?: number
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  disableAnimation?: boolean
}

export function PopoverContent(props: PopoverContentProps) {
  const {
    children,
    container,
    forceMount,
    showArrow = false,
    sideOffset = 5,
    side = 'bottom',
    align = 'start',
    zIndex = 50,
    classNames,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    disableAnimation = false,
    style,
    ref,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    ...contentProps
  } = props

  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation = disableAnimation || globalDisableAnimation

  const finalMotionProps: HTMLMotionProps<'section'> = {
    initial: {
      opacity: 0,
      y: 'var(--y-initial, 0px)',
      x: 'var(--x-initial, 0px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
    },
    ...{ transition: { duration: 0.15 } },
    ...(shouldDisableAnimation ? { transition: { duration: 0 } } : {}),
  }

  const slots = popoverContentVariants({})

  return (
    <PopoverPrimitive.Portal container={container} forceMount={forceMount}>
      <PopoverPrimitive.Content
        asChild
        {...contentProps}
        ref={ref}
        sideOffset={sideOffset}
        side={side}
        align={align}
        style={{
          zIndex,
          ...style,
        }}
        className={swClsx(
          slots.content({
            className: classNames?.content,
          }),
        )}
        onEscapeKeyDown={(event) => {
          onEscapeKeyDown?.(event)
          if (closeOnEscape === false) {
            event.preventDefault()
          }
        }}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event)
          if (closeOnOutsideClick === false) {
            event.preventDefault()
          }
        }}
        onFocusOutside={(event) => {
          onFocusOutside?.(event)
          if (closeOnOutsideClick === false) {
            event.preventDefault()
          }
        }}
      >
        <motion.section {...finalMotionProps}>
          {children}

          {showArrow && (
            <PopoverPrimitive.Arrow
              className={swClsx(
                slots.arrow({
                  className: classNames?.arrow,
                }),
              )}
            />
          )}
        </motion.section>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
