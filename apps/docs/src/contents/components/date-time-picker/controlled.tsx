'use client'

import { getCurrentDateTime, type DateValue } from '@repo/date'
import { DateTimePicker } from '@repo/ui/components/date-picker'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<DateValue | null>(getCurrentDateTime())
  return (
    <div>
      <div>value: {value?.toString()}</div>
      <DateTimePicker label="Controlled" value={value} onChange={setValue} />
    </div>
  )
}
