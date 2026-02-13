'use client'

import { TextField } from '@repo/ui/components/text-field'
import { useFieldContext } from '../form-context'

export function FormTextField(props: React.ComponentProps<typeof TextField>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<string>()

  const errorMessage = field.state.meta.errors
    .map((error) => error.message)
    .join(', ')

  return (
    <TextField
      name={name}
      isDirty={field.state.meta.isDirty}
      isTouched={field.state.meta.isTouched}
      isInvalid={!field.state.meta.isValid}
      value={field.state.value}
      onValueChange={field.handleChange}
      errorMessage={errorMessage}
      {...otherProps}
    />
  )
}
