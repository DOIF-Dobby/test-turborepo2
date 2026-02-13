'use client'

import {
  Combobox,
  type ComboboxRootProps,
  type DefaultComboboxItem,
} from '@repo/ui/components/combobox'
import { useFieldContext } from '../form-context'

export function FormCombobox<
  Item extends DefaultComboboxItem = DefaultComboboxItem,
  Multiple extends boolean | undefined = false,
>(props: React.ComponentProps<typeof Combobox<Item, Multiple>>) {
  const { name, ...otherProps } = props
  const field = useFieldContext<ComboboxRootProps<Item, Multiple>['value']>()

  const errorMessage = field.state.meta.errors
    .map((error) => error.message)
    .join(', ')

  return (
    <Combobox
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
