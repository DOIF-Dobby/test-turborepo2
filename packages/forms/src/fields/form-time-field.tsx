'use client'

import type { Time } from '@repo/date'
import { TimeField } from '@repo/ui/components/date-field'
import { useMemo } from 'react'
import { useFieldContext } from '../form-context'

export function FormTimeField(props: React.ComponentProps<typeof TimeField>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<Time | null>()
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
    <TimeField
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
