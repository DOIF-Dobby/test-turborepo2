'use client'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon, Minus } from 'lucide-react'
import { useRef } from 'react'
import { mergeProps, usePress } from 'react-aria'
import { useScaleAnimation } from '../../animations/use-scale-animation'
import { AnimatedCheckIcon } from '../../components/checkbox/animated-check-icon'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import {
  type CheckboxSlots,
  checkboxVariants,
  type CheckboxVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  keyof CheckboxVariants | 'disabled' | 'className'
> &
  CheckboxVariants

export interface CheckboxProps extends Props {
  classNames?: SlotsToClasses<CheckboxSlots>
}

export function Checkbox(props: CheckboxProps) {
  const {
    ref,
    children,
    size,
    disableAnimation,
    isDisabled,
    isInvalid,
    classNames,
    ...otherProps
  } = props

  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation = disableAnimation || globalDisableAnimation

  const rootRef = useRef<HTMLSpanElement>(null)

  const { pressProps, isPressed } = usePress({
    isDisabled,
    ref: rootRef,
  })

  const { scope } = useScaleAnimation({
    isPressed,
    duration: 0.2,
    scale: 0.92,
    disableAnimation: shouldDisableAnimation,
  })

  const slots = checkboxVariants({
    size,
    isDisabled,
    disableAnimation: shouldDisableAnimation,
    isInvalid,
  })

  return (
    <label
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <CheckboxPrimitive.Root
        suppressHydrationWarning
        ref={mergeRefs([ref, rootRef, scope])}
        disabled={isDisabled}
        className={swClsx(slots.root({ className: classNames?.root }))}
        {...mergeProps(pressProps, otherProps)}
      >
        <CheckboxPrimitive.Indicator
          keepMounted
          className={swClsx(
            slots.indicator({ className: classNames?.indicator }),
          )}
          render={(props, state) => (
            <span {...props}>
              {state.indeterminate ? (
                <Minus
                  className={swClsx(
                    slots.icon({ className: classNames?.icon }),
                  )}
                />
              ) : (
                <AnimatedCheckIcon
                  checked={state.checked}
                  disableAnimation={shouldDisableAnimation}
                  className={swClsx(
                    slots.icon({ className: classNames?.icon }),
                  )}
                />
              )}
            </span>
          )}
        >
          <CheckIcon
            className={swClsx(slots.icon({ className: classNames?.icon }))}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <span className={swClsx(slots.label({ className: classNames?.label }))}>
        {children}
      </span>
    </label>
  )
}
