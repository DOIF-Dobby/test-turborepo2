'use client'

import { createFormHook } from '@tanstack/react-form'
import * as v from 'valibot'
import { fieldContext, formContext } from './context'
import { FormButton } from './form-button'
import { FormTextField } from './form-text-field'

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
  },
  formComponents: {
    SubmitButton: FormButton,
  },
  fieldContext,
  formContext,
})

const UserSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
})

export default function CreateFormHook() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
    },
    validators: {
      onSubmit: UserSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      await new Promise((resolve) => setTimeout(resolve, 200))
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.AppField name="firstName">
          {(field) => {
            return <field.TextField label="First Name" />
          }}
        </form.AppField>

        <form.AppForm>
          <form.SubmitButton>Submit</form.SubmitButton>
        </form.AppForm>
      </form>
    </div>
  )
}
