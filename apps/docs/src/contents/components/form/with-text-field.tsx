'use client'

import { Button } from '@repo/ui/components/button'
import { Form } from '@repo/ui/components/form'
import { TextField } from '@repo/ui/components/text-field'
import { useState } from 'react'

export default function WithTextField() {
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
      <TextField
        label="URL"
        name="url"
        isRequired
        defaultValue="https://example.com"
        placeholder="https://example.com"
        pattern="https?://.*"
      />

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
    setTimeout(resolve, 500)
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
