'use client'

import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
import type { FieldState } from '../field/field-type'
import {
  type CheckboxGroupSlots,
  checkboxGroupVariants,
  type CheckboxGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof CheckboxGroupPrimitive>,
  keyof CheckboxGroupVariants | 'className'
> &
  CheckboxGroupVariants &
  FieldState

export interface CheckboxGroupProps extends Props {
  classNames?: SlotsToClasses<CheckboxGroupSlots>
  description?: React.ReactNode
  label?: React.ReactNode
  name?: string
  errorMessage?: React.ReactNode
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    children,
    classNames,
    orientation,
    name,
    label,
    description,
    isDirty,
    isTouched,
    isInvalid,
    errorMessage,
    ...otherProps
  } = props

  const slots = checkboxGroupVariants({ orientation })

  return (
    <Field
      name={name}
      dirty={isDirty}
      touched={isTouched}
      invalid={isInvalid}
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      {label && <Field.Label>{label}</Field.Label>}
      <CheckboxGroupPrimitive
        className={swClsx(slots.root({ className: classNames?.root }))}
        {...otherProps}
      >
        {children}
      </CheckboxGroupPrimitive>

      {description && <Field.Description>{description}</Field.Description>}

      <Field.Error match={isInvalid} errorMessage={errorMessage} />
    </Field>
  )
}
