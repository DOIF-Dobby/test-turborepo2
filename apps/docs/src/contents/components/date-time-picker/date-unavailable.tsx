'use client'

import { isWeekend } from '@repo/date'
import { DateTimePicker } from '@repo/ui/components/date-picker'

export default function DateUnavailable() {
  return (
    <DateTimePicker
      label="Date Unavailable"
      isDateUnavailable={(date) => isWeekend(date)}
    />
  )
}
