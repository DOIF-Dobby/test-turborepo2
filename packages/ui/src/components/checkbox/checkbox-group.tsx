'use client'

import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
import {
  type CheckboxGroupSlots,
  checkboxGroupVariants,
  type CheckboxGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof CheckboxGroupPrimitive>,
  keyof CheckboxGroupVariants | 'className'
> &
  CheckboxGroupVariants

export interface CheckboxGroupProps extends Props {
  classNames?: SlotsToClasses<CheckboxGroupSlots>
  description?: React.ReactNode
  label?: React.ReactNode
  name?: string
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    children,
    classNames,
    orientation,
    name,
    label,
    description,
    ...otherProps
  } = props

  const slots = checkboxGroupVariants({ orientation })

  return (
    <Field name={name}>
      {label && <Field.Label>{label}</Field.Label>}
      <CheckboxGroupPrimitive
        className={swClsx(slots.root({ className: classNames?.root }))}
        {...otherProps}
      >
        {children}
      </CheckboxGroupPrimitive>

      {description && <Field.Description>{description}</Field.Description>}
      <Field.Error />
    </Field>
  )
}
