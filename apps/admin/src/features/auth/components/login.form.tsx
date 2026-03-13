'use client'

import { AppForm, useAppForm } from '@repo/forms'
import { safePromise } from '@repo/utils/promise'
import { vRequiredString } from '@repo/validators'
import { useRouter } from 'next/navigation'
import * as v from 'valibot'
import { useLogin } from '../services/auth.hooks'

const FormSchema = v.object({
  username: vRequiredString(),
  password: vRequiredString(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  username: '',
  password: '',
}

interface LoginFormProps {
  callbackUrl: string
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const loginMutation = useLogin()
  const router = useRouter()

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await safePromise(loginMutation.mutateAsync(value))
      if (result && result.code === 'OK') {
        router.replace(callbackUrl)
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="username">
        {(field) => (
          <field.TextField label="ID" isRequired autoComplete="username" />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.TextField
            label="Password"
            isRequired
            type="password"
            autoComplete="current-password"
          />
        )}
      </form.AppField>

      <form.SubmitButton>Login</form.SubmitButton>
    </AppForm>
  )
}
