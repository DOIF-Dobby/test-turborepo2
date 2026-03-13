import { AppForm, useAppForm } from '@repo/forms'
import { safePromise } from '@repo/utils/promise'
import { vRequiredString } from '@repo/validators'
import * as v from 'valibot'
import { useLogin } from '../services/login.hooks'

const FormSchema = v.object({
  username: vRequiredString(),
  password: vRequiredString(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  username: '',
  password: '',
}

export function LoginForm() {
  const loginMutation = useLogin()

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await safePromise(loginMutation.mutateAsync(value))
      if (result) {
        console.log(result.data.accessToken)
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="username">
        {(field) => <field.TextField label="ID" isRequired />}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.TextField label="Password" isRequired type="password" />
        )}
      </form.AppField>

      <form.SubmitButton>Login</form.SubmitButton>
    </AppForm>
  )
}
