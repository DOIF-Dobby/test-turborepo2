'use client'

import { Button } from '@repo/ui/components/button'
import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'
import { Form } from '@repo/ui/components/form'
import { useState } from 'react'

export default function WithCheckboxGroup() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className="gap-sw-md flex flex-col"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const values = formData.getAll('fruit') as string[]

        setLoading(true)
        const response = await submitForm(values)
        const serverErrors = {
          fruit: response.error,
        }

        setErrors(serverErrors)
        setLoading(false)
      }}
    >
      <CheckboxGroup name="fruit" label="Fruit" defaultValue={['banana']}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
      </CheckboxGroup>

      <div className="flex justify-end">
        <Button type="submit" isLoading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

async function submitForm(values: string[]) {
  console.log(values)

  await new Promise((resolve) => {
    setTimeout(resolve, 500)
  })

  try {
    if (values.includes('banana')) {
      return { error: 'Banana is not allowed' }
    }
  } catch {
    return { error: 'This is not a valid fruit' }
  }

  return { success: true }
}
