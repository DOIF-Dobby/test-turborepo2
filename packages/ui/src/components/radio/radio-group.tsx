'use client'

import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type RadioGroupSlots,
  radioGroupVariants,
  type RadioGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive>,
  keyof RadioGroupVariants | 'className'
> &
  RadioGroupVariants

export interface RadioGroupProps extends Props {
  classNames?: SlotsToClasses<RadioGroupSlots>
}

export function RadioGroup(props: RadioGroupProps) {
  const { classNames, children, orientation, ...otherProps } = props

  const slots = radioGroupVariants({
    orientation,
  })

  return (
    <RadioGroupPrimitive
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(slots.root({ className: classNames?.root }))}
    >
      {children}
    </RadioGroupPrimitive>
  )
}
