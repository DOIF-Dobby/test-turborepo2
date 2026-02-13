'use client'

import { AppForm, useAppForm } from '@repo/forms'
import * as v from 'valibot'

const UserSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  lastName: v.pipe(
    v.string(),
    v.maxLength(3, '3글자 이상 입력할 수 없습니다.'),
  ),
})

export default function AppFormExample() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    validators: {
      onDynamic: UserSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log(value)
    },
  })

  return (
    <AppForm form={form} className="gap-sw-md flex flex-col">
      <form.AppField name="firstName">
        {(field) => <field.TextField label="First Name" />}
      </form.AppField>
      <form.AppField name="lastName">
        {(field) => <field.TextField label="Last Name" />}
      </form.AppField>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
