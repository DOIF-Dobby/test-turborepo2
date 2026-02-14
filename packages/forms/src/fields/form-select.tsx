'use client'

import {
  Select,
  type DefaultSelectItem,
  type SelectRootProps,
} from '@repo/ui/components/select'
import { useMemo } from 'react'
import { useFieldContext } from '../form-context'

export function FormSelect<
  Item extends DefaultSelectItem = DefaultSelectItem,
  Multiple extends boolean | undefined = false,
>(props: React.ComponentProps<typeof Select<Item, Multiple>>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<SelectRootProps<Item, Multiple>['value']>()
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
    <Select
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
