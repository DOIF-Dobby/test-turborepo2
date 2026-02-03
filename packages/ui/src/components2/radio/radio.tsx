'use client'

import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { useRef } from 'react'
import { mergeProps, usePress } from 'react-aria'
import { useScaleAnimation } from '../../animations/use-scale-animation'
import { AnimatedRadioIcon } from '../../components/radio-group/animated-radio-icon'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import { radioVariants, type RadioSlots, type RadioVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof RadioPrimitive.Root>,
  keyof RadioVariants
> &
  RadioVariants

export interface RadioProps extends Props {
  classNames?: SlotsToClasses<RadioSlots>
}

export function Radio(props: RadioProps) {
  const {
    ref,
    children,
    size,
    disableAnimation,
    classNames,
    isDisabled,
    isInvalid,
    ...otherProps
  } = props

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const rootRef = useRef<HTMLInputElement>(null)

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

  const slots = radioVariants({
    size,
    isDisabled,
    isInvalid,
    disableAnimation: shouldDisableAnimation,
  })

  return (
    <label
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <RadioPrimitive.Root
        {...mergeProps(pressProps, otherProps)}
        suppressHydrationWarning
        ref={mergeRefs([ref, rootRef, scope])}
        className={swClsx(slots.root({ className: classNames?.root }))}
        disabled={isDisabled}
        render={(radioProps) => (
          <>
            <span {...radioProps} />
          </>
        )}
      >
        <RadioPrimitive.Indicator
          suppressHydrationWarning
          className={swClsx(
            slots.indicator({ className: classNames?.indicator }),
          )}
        >
          <AnimatedRadioIcon disableAnimation={shouldDisableAnimation} />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>

      <span className={swClsx(slots.label({ className: classNames?.label }))}>
        {children}
      </span>
    </label>
  )
}
