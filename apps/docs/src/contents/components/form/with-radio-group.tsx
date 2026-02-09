'use client'

import { Button } from '@repo/ui/components/button'
import { Form } from '@repo/ui/components/form'
import { Radio, RadioGroup } from '@repo/ui/components/radio'
import { useState } from 'react'

export default function WithRadioGroup() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className="gap-sw-md flex flex-col"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const value = formData.get('fruit') as string

        setLoading(true)
        const response = await submitForm(value)
        const serverErrors = {
          fruit: response.error,
        }

        setErrors(serverErrors)
        setLoading(false)
      }}
    >
      <RadioGroup name="fruit" label="Fruit" defaultValue="banana">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>

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
    if (value === 'banana') {
      return { error: 'Banana is not allowed' }
    }
  } catch {
    return { error: 'This is not a valid fruit' }
  }

  return { success: true }
}
