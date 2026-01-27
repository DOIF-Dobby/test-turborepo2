'use client'

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import type { RadioProps } from './radio'
import { RadioGroupContext } from './radio-group-context'
import {
  type RadioGroupSlots,
  radioGroupVariants,
  type RadioGroupVariants,
} from './variants'

type Props = Omit<
  RadioGroupPrimitive.RadioGroupProps,
  keyof RadioGroupVariants | 'className'
> &
  RadioGroupVariants

export interface RadioGroupProps extends Props {
  classNames?: SlotsToClasses<RadioGroupSlots>
  size?: RadioProps['size']
  isInvalid?: boolean // 그룹 전체 에러
  isDisabled?: boolean // 그룹 전체 비활성
  disableAnimation?: boolean // 그룹 전체 애니메이션 끔
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    children,
    classNames,
    size,
    orientation,
    isInvalid,
    isDisabled,
    name,
    disableAnimation,
    value,
    onValueChange,
    ...otherProps
  } = props

  const slots = radioGroupVariants({ orientation })

  return (
    <RadioGroupContext
      value={{
        size,
        isInvalid,
        isDisabled,
        disableAnimation,
        name,
      }}
    >
      <RadioGroupPrimitive.Root
        suppressHydrationWarning
        className={swClsx(slots.root({ className: classNames?.root }))}
        orientation={orientation}
        disabled={isDisabled}
        name={name}
        value={value}
        onValueChange={onValueChange}
        {...otherProps}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext>
  )
}
