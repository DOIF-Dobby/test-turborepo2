'use client'

import type { DateValue } from '@repo/date'
import { DatePicker } from '@repo/ui/components/date-picker'
import { useFieldContext } from '../form-context'

export function FormDatePicker(props: React.ComponentProps<typeof DatePicker>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<DateValue | null>()

  const errorMessage = field.state.meta.errors
    .map((error) => error.message)
    .join(', ')

  return (
    <DatePicker
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
