'use client'

import { Button } from '@repo/ui/components/button'
import { Field } from '@repo/ui/components/field'
import { Form } from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { swClsx } from '@repo/ui/utils/clsx'
import { useState } from 'react'

export default function Default() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className="gap-sw-md flex flex-col"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const value = formData.get('url') as string

        setLoading(true)
        const response = await submitForm(value)
        const serverErrors = {
          url: response.error,
        }

        setErrors(serverErrors)
        setLoading(false)
      }}
    >
      <Field name="url">
        <Field.Label>URL</Field.Label>
        <Input
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
          className={swClsx(
            'h-10',
            'w-full',
            'rounded-md',
            'border',
            'border-gray-200',
            'pl-3.5',
            'text-base',
            'text-gray-900',
            'data-focused:outline-none',
            'data-focused:ring-2',
            'data-focused:ring-cta1-hover',
            'data-focused:ring-offset-2',
            'data-invalid:border-destructive',
          )}
        />
        <Field.Error />
      </Field>
      <div className="flex justify-end">
        <Button type="submit" isLoading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

async function submitForm(value: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  try {
    const url = new URL(value)

    if (url.hostname.endsWith('example.com')) {
      return { error: 'The example domain is not allowed' }
    }
  } catch {
    return { error: 'This is not a valid URL' }
  }

  return { success: true }
}
