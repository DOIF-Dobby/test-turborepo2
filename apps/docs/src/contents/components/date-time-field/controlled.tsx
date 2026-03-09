'use client'

import { getCurrentDateTime, type DateValue } from '@repo/date'
import { DateTimeField } from '@repo/ui/components/date-field'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<DateValue | null>(getCurrentDateTime())

  return (
    <div className="flex flex-col gap-sw-sm">
      <div>선택된 값: {value?.toString()}</div>
      <DateTimeField label="Controlled" value={value} onChange={setValue} />
    </div>
  )
}
