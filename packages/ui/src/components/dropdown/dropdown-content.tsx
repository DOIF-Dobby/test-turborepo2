'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  dropdownContentVariants,
  type DropdownContentSlots,
  type DropdownContentVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof DropdownPrimitive.Content>,
  keyof DropdownContentVariants | 'className'
> &
  DropdownContentVariants &
  DropdownPrimitive.DropdownMenuPortalProps

export interface DropdownContentProps extends Props {
  classNames?: SlotsToClasses<DropdownContentSlots>
  disableAnimation?: boolean
  showArrow?: boolean
  zIndex?: number
}

export function DropdownContent(props: DropdownContentProps) {
  const {
    children,
    container,
    forceMount,
    classNames,
    sideOffset = 5,
    side = 'bottom',
    align = 'start',
    disableAnimation = false,
    showArrow = false,
    zIndex = 50,
    style,
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

  const slots = dropdownContentVariants({})

  return (
    <DropdownPrimitive.Portal container={container} forceMount={forceMount}>
      <DropdownPrimitive.Content
        asChild
        {...contentProps}
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
      >
        <motion.section {...finalMotionProps}>
          {children}

          {showArrow && (
            <DropdownPrimitive.Arrow
              className={swClsx(
                slots.arrow({
                  className: classNames?.arrow,
                }),
              )}
            />
          )}
        </motion.section>
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  )
}
