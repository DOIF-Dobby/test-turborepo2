'use client'

import { getToday, type DateValue } from '@repo/date'
import { DatePicker } from '@repo/ui/components/date-picker'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<DateValue | null>(getToday())
  return (
    <div>
      <div>value: {value?.toString()}</div>
      <DatePicker label="Controlled" value={value} onChange={setValue} />
    </div>
  )
}
