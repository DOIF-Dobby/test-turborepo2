'use client'

import { getToday } from '@repo/date'
import { DatePicker } from '@repo/ui/components/date-picker'

export default function MinMaxDate() {
  const today = getToday()

  return (
    <DatePicker
      label="Min Max Date"
      defaultValue={today}
      minValue={today.subtract({ days: 1 })}
      maxValue={today.add({ days: 1 })}
    />
  )
}
