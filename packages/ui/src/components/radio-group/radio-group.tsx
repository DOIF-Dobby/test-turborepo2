'use client'

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type RadioGroupSlots,
  radioGroupVariants,
  type RadioGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  keyof RadioGroupVariants | 'className'
> &
  RadioGroupVariants

export interface RadioGroupProps extends Props {
  classNames?: SlotsToClasses<RadioGroupSlots>
}

export function RadioGroup(props: RadioGroupProps) {
  const { children, classNames, orientation, ...otherProps } = props

  const slots = radioGroupVariants({ orientation })

  return (
    <RadioGroupPrimitive.Root
      className={swClsx(slots.root({ className: classNames?.root }))}
      {...otherProps}
    >
      {children}
    </RadioGroupPrimitive.Root>
  )
}
