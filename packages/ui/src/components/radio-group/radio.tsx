'use client'

import { usePress } from '@react-aria/interactions'
import { useFallbackId } from '@repo/hooks/use-fallback-id'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { useRef } from 'react'
import { useScaleAnimation } from '../../animations/use-scale-animation'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import { AnimatedRadioIcon } from './animated-radio-icon'
import { useRadioGroupContext } from './radio-group-context'
import { radioVariants, type RadioSlots, type RadioVariants } from './variants'

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  keyof RadioVariants | 'className'
> &
  RadioVariants

export interface RadioProps extends Props {
  children?: React.ReactNode
  classNames?: SlotsToClasses<RadioSlots>
  disableAnimation?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
}

export function Radio(props: RadioProps) {
  const {
    children,
    classNames,
    size: sizeProp,
    id: idProp,
    isDisabled: isDisabledProp,
    isInvalid: isInvalidProp,
    disableAnimation: localDisableAnimation,
    ...otherProps
  } = props

  const id = useFallbackId(idProp)
  const innerRef = useRef<HTMLButtonElement>(null)

  const groupContext = useRadioGroupContext()

  const size = groupContext?.size || sizeProp || 'md'
  const isDisabled = groupContext?.isDisabled || isDisabledProp || false
  const isInvalid = groupContext?.isInvalid || isInvalidProp || false

  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation =
    localDisableAnimation ||
    groupContext?.disableAnimation || // 그룹 설정 추가
    globalDisableAnimation

  const { pressProps, isPressed } = usePress({
    isDisabled,
    ref: innerRef,
  })

  const { scope } = useScaleAnimation({
    isPressed,
    duration: 0.2,
    scale: 0.92,
    disableAnimation: shouldDisableAnimation,
  })

  const slots = radioVariants({ size, isInvalid })

  return (
    <div
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <RadioGroupPrimitive.Item
        suppressHydrationWarning
        ref={mergeRefs([innerRef, scope])}
        id={id}
        className={swClsx(slots.root({ className: classNames?.root }))}
        disabled={isDisabled}
        {...otherProps}
        {...pressProps}
      >
        <RadioGroupPrimitive.Indicator
          className={swClsx(
            slots.indicator({ className: classNames?.indicator }),
          )}
        >
          <AnimatedRadioIcon disableAnimation={shouldDisableAnimation} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {children && (
        <label
          suppressHydrationWarning
          htmlFor={id}
          className={swClsx(slots.label({ className: classNames?.label }))}
        >
          {children}
        </label>
      )}
    </div>
  )
}
