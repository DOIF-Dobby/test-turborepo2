'use client'

import { getCurrentDateTime } from '@repo/date'
import { DateTimeField } from '@repo/ui/components/date-field'

export default function MinMaxDateTime() {
  const currentDateTime = getCurrentDateTime()
  return (
    <DateTimeField
      label="Min max date"
      defaultValue={currentDateTime}
      minValue={currentDateTime.subtract({ days: 1, hours: 1 })}
      maxValue={currentDateTime.add({ days: 1, hours: 1 })}
    />
  )
}
