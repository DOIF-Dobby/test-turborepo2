'use client'

import {
  Select,
  type DefaultSelectItem,
  type SelectRootProps,
} from '@repo/ui/components/select'
import { useFieldContext } from '../form-context'

export function FormSelect<
  Item extends DefaultSelectItem = DefaultSelectItem,
  Multiple extends boolean | undefined = false,
>(props: React.ComponentProps<typeof Select<Item, Multiple>>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<SelectRootProps<Item, Multiple>['value']>()

  const errorMessage = field.state.meta.errors
    .map((error) => error.message)
    .join(', ')

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
