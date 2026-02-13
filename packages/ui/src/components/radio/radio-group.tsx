'use client'

import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
import type { FieldState } from '../field/field-type'
import {
  type RadioGroupSlots,
  radioGroupVariants,
  type RadioGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive>,
  keyof RadioGroupVariants | 'className'
> &
  RadioGroupVariants &
  FieldState

export interface RadioGroupProps extends Props {
  classNames?: SlotsToClasses<RadioGroupSlots>
  description?: React.ReactNode
  label?: React.ReactNode
  errorMessage?: React.ReactNode
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    classNames,
    children,
    orientation,
    name,
    description,
    label,
    isDirty,
    isTouched,
    isInvalid,
    errorMessage,
    ...otherProps
  } = props

  const slots = radioGroupVariants({
    orientation,
  })

  return (
    <Field
      name={name}
      dirty={isDirty}
      touched={isTouched}
      invalid={isInvalid}
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
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

      <Field.Error match={isInvalid} errorMessage={errorMessage} />
    </Field>
  )
}
