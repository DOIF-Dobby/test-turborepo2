'use client'

import { Button } from '@repo/ui/components/button'
import { useFormContext } from './context'

export function FormButton(props: React.ComponentPropsWithRef<typeof Button>) {
  const { children, ...otherProps } = props

  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" isLoading={isSubmitting} {...otherProps}>
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
