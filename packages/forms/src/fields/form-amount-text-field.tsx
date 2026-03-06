'use client'

import { AmountTextField } from '@repo/ui/components/text-field'
import { useMemo } from 'react'
import { useFieldContext } from '../form-context'

export function FormAmountTextField(
  props: React.ComponentProps<typeof AmountTextField>,
) {
  const { name, ...otherProps } = props
  const field = useFieldContext<string>()
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
    <AmountTextField
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
