'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { motion, type MotionProps } from 'motion/react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { DefaultArrowSvg } from './default-arrow'
import {
  menuContentVariants,
  type MenuContentSlots,
  type MenuContentVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.Positioner>,
  keyof MenuContentVariants | 'className'
> &
  MenuContentVariants

export interface MenuContentProps extends Props {
  classNames?: SlotsToClasses<MenuContentSlots>
  showArrow?: boolean
  arrow?: React.ReactNode
  zIndex?: number
  disableAnimation?: boolean
}

export function MenuContent(props: MenuContentProps) {
  const {
    children,
    classNames,
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

  const slots = menuContentVariants({})

  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        {...otherProps}
        side={side}
        align={align}
        sideOffset={sideOffset}
        style={{
          zIndex,
          ...style,
        }}
      >
        <MenuPrimitive.Popup
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
                  <MenuPrimitive.Arrow
                    className={swClsx(
                      slots.arrow({ className: classNames?.arrow }),
                    )}
                  >
                    {arrow}
                  </MenuPrimitive.Arrow>
                )}
                {children}
              </motion.div>
            )
          }}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}
