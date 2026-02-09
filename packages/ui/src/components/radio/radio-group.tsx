'use client'

import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
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
  description?: React.ReactNode
  label?: React.ReactNode
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    classNames,
    children,
    orientation,
    name,
    description,
    label,
    ...otherProps
  } = props

  const slots = radioGroupVariants({
    orientation,
  })

  return (
    <Field name={name}>
      {label && <Field.Label>{label}</Field.Label>}
      <RadioGroupPrimitive
        {...otherProps}
        name={name}
        suppressHydrationWarning
        className={swClsx(slots.root({ className: classNames?.root }))}
      >
        {children}
      </RadioGroupPrimitive>

      {description && <Field.Description>{description}</Field.Description>}
      <Field.Error />
    </Field>
  )
}
