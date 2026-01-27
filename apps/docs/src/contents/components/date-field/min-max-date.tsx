'use client'

import { getToday } from '@repo/date'
import { DateField } from '@repo/ui/components/date-field'

export default function MinMaxDate() {
  const today = getToday()
  return (
    <DateField
      label="Min max date"
      defaultValue={today}
      minValue={today.subtract({ days: 1 })}
      maxValue={today.add({ days: 1 })}
    />
  )
}
