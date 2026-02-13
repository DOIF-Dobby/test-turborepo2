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
          canSubmit: state.canSubmit,
        }
      }}
    >
      {(state) => (
        <Button
          type="submit"
          isLoading={state.isSubmitting}
          isDisabled={!state.canSubmit}
          {...otherProps}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
