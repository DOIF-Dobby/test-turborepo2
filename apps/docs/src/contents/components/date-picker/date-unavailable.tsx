'use client'

import { isWeekend } from '@repo/date'
import { DatePicker } from '@repo/ui/components/date-picker'

export default function DateUnavailable() {
  return (
    <DatePicker
      label="Date Unavailable"
      isDateUnavailable={(date) => isWeekend(date)}
    />
  )
}
