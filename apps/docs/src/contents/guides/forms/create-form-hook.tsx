'use client'

import { AppForm, useAppForm } from '@repo/forms'
import { formOptions } from '@tanstack/react-form'
import * as v from 'valibot'

const UserSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
})

const formOpts = formOptions({
  defaultValues: {
    firstName: '',
  },
  validators: {
    onSubmit: UserSchema,
  },
  onSubmit: async ({ value }) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(value)
  },
})

export default function CreateFormHook() {
  const form = useAppForm(formOpts)

  return (
    <AppForm form={form} className="gap-sw-md flex flex-col">
      <form.AppField name="firstName">
        {(field) => <field.TextField label="First Name" />}
      </form.AppField>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
