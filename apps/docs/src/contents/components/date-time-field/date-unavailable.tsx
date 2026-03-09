'use client'

import { getCurrentDateTime, isWeekend } from '@repo/date'
import { DateTimeField } from '@repo/ui/components/date-field'

export default function DateUnavailable() {
  return (
    <DateTimeField
      isDateUnavailable={(date) => isWeekend(date)}
      defaultValue={getCurrentDateTime()}
    />
  )
}
