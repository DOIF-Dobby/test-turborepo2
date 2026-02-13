'use client'

import { Button } from '@repo/ui/components/button'
import { TextField } from '@repo/ui/components/text-field'
import { useForm } from '@tanstack/react-form'
import * as v from 'valibot'

const UserSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  lastName: v.pipe(
    v.string(),
    v.maxLength(3, '3글자 이상 입력할 수 없습니다.'),
  ),
})

export default function TanstackFormValibot() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    validators: {
      onChange: UserSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log(value)
    },
  })

  return (
    <form
      className="gap-sw-md flex flex-col"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="firstName">
        {(field) => (
          <TextField
            label="First Name"
            isDirty={field.state.meta.isDirty}
            isTouched={field.state.meta.isTouched}
            isInvalid={!field.state.meta.isValid}
            value={field.state.value}
            onValueChange={field.handleChange}
            errorMessage={field.state.meta.errors.map(
              (error) => error?.message,
            )}
          />
        )}
      </form.Field>

      <form.Field name="lastName">
        {(field) => (
          <TextField
            label="Last Name"
            isDirty={field.state.meta.isDirty}
            isTouched={field.state.meta.isTouched}
            isInvalid={!field.state.meta.isValid}
            value={field.state.value}
            onValueChange={field.handleChange}
            errorMessage={field.state.meta.errors.map(
              (error) => error?.message,
            )}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
