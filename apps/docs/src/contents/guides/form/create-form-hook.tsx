'use client'

import { createFormHook } from '@tanstack/react-form'
import * as v from 'valibot'
import { fieldContext, formContext } from './context'
import { FormTextField } from './form-text-field'

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
  },
  formComponents: {},
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

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
