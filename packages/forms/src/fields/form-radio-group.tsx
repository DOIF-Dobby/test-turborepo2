'use client'

import { RadioGroup } from '@repo/ui/components/radio'
import { useFieldContext } from '../form-context'

export function FormRadioGroup(props: React.ComponentProps<typeof RadioGroup>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<string>()

  const errorMessage = field.state.meta.errors
    .map((error) => error.message)
    .join(', ')

  return (
    <RadioGroup
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
