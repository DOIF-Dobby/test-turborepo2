'use client'

import { getCurrentDateTime } from '@repo/date'
import { DateTimePicker } from '@repo/ui/components/date-picker'

export default function MinMaxDate() {
  const currentDateTime = getCurrentDateTime()

  return (
    <DateTimePicker
      label="Min Max Date"
      defaultValue={currentDateTime}
      minValue={currentDateTime.subtract({ days: 1, hours: 1 })}
      maxValue={currentDateTime.add({ days: 1, hours: 1 })}
    />
  )
}
