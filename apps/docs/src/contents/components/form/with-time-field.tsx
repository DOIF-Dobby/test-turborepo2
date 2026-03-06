'use client'

import { getCurrentTime, parseTime } from '@repo/date'
import { Button } from '@repo/ui/components/button'
import { TimeField } from '@repo/ui/components/date-field'
import { Form } from '@repo/ui/components/form'
import { useState } from 'react'

export default function WithTimeField() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  return (
    <Form
      className="flex flex-col gap-sw-md"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const value = formData.get('time') as string

        setLoading(true)
        const response = await submitForm(value)
        const serverErrors = {
          time: response.error,
        }

        setErrors(serverErrors)
        setLoading(false)
      }}
    >
      <TimeField
        label="Time"
        name="time"
        isRequired
        defaultValue={getCurrentTime()}
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
    const time = parseTime(value)
    const currentTime = getCurrentTime()

    if (time.hour === currentTime.hour) {
      return { error: 'The time is not allowed' }
    }
  } catch {
    return { error: 'This is not a valid time' }
  }

  return { success: true }
}
