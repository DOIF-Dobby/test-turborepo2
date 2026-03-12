'use client'

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { domMax, LazyMotion, motion } from 'motion/react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { useToggleGroupContext } from './toggle-group-context'
import {
  type ToggleSlots,
  toggleVariants,
  type ToggleVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof TogglePrimitive>,
  keyof ToggleVariants | 'className'
> &
  ToggleVariants

export interface ToggleProps extends Props {
  classNames?: SlotsToClasses<ToggleSlots>
}

export function Toggle(props: ToggleProps) {
  const { classNames, render, ...ohterProps } = props

  const { layoutId, motionAnimation } = useToggleGroupContext()

  const slots = toggleVariants({ motionAnimation })

  return (
    <TogglePrimitive
      suppressHydrationWarning
      className={swClsx(slots.toggle({ className: classNames?.toggle }))}
      render={
        render
          ? render
          : (toggleProps, state) => {
              const { children, ...rest } = toggleProps

              if (!motionAnimation) {
                return (
                  <button type="button" {...rest}>
                    {children}
                  </button>
                )
              }

              return (
                <>
                  <button type="button" {...rest}>
                    <span className="z-10">{children}</span>
                    {state.pressed && motionAnimation && (
                      <LazyMotion features={domMax}>
                        <motion.span
                          layoutId={`indicator-${layoutId}`}
                          className={swClsx(
                            slots.indicator({
                              className: classNames?.indicator,
                            }),
                          )}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </LazyMotion>
                    )}
                  </button>
                </>
              )
            }
      }
      {...ohterProps}
    />
  )
}
