'use client'

import type { DateValue } from '@repo/date'
import { DateField } from '@repo/ui/components/date-field'
import { useMemo } from 'react'
import { useFieldContext } from '../form-context'

export function FormDateField(props: React.ComponentProps<typeof DateField>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<DateValue | null>()
  const errors = field.state.meta.errors

  const errorMessage = useMemo(() => {
    if (errors.length === 0) {
      return undefined
    }

    if (typeof errors[0] === 'string') {
      return errors.join(', ')
    }

    return errors.map((error) => error.message).join(', ')
  }, [errors])

  return (
    <DateField
      name={name}
      isDirty={field.state.meta.isDirty}
      isTouched={field.state.meta.isTouched}
      isInvalid={!field.state.meta.isValid}
      value={field.state.value}
      onChange={field.handleChange}
      errorMessage={errorMessage}
      {...otherProps}
    />
  )
}
