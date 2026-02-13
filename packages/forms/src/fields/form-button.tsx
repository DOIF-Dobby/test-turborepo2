'use client'

import { Button } from '@repo/ui/components/button'
import { useFormContext } from '../form-context'

export function FormButton(props: React.ComponentPropsWithRef<typeof Button>) {
  const { children, ...otherProps } = props

  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => {
        return {
          isSubmitting: state.isSubmitting,
          isDisabled: !state.isValid,
        }
      }}
    >
      {(state) => (
        <Button
          type="submit"
          isLoading={state.isSubmitting}
          isDisabled={state.isDisabled}
          {...otherProps}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
