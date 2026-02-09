'use client'

import { getToday, parseDate } from '@repo/date'
import { Button } from '@repo/ui/components/button'
import { DatePicker } from '@repo/ui/components/date-picker'
import { Form } from '@repo/ui/components/form'
import { useState } from 'react'

export default function WithDatePicker() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className="gap-sw-md flex flex-col"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const value = formData.get('date') as string

        setLoading(true)
        const response = await submitForm(value)
        const serverErrors = {
          date: response.error,
        }

        setErrors(serverErrors)
        setLoading(false)
      }}
    >
      <DatePicker
        label="Date"
        name="date"
        isRequired
        defaultValue={getToday()}
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
    const date = parseDate(value)

    if (date.compare(getToday()) === 0) {
      return { error: 'The date is not allowed' }
    }
  } catch {
    return { error: 'This is not a valid date' }
  }

  return { success: true }
}
