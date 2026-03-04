'use client'

import { getToday, type DateValue } from '@repo/date'
import { DateField } from '@repo/ui/components/date-field'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<DateValue | null>(getToday())

  return (
    <div className="flex flex-col gap-sw-sm">
      <div>선택된 값: {value?.toString()}</div>
      <DateField label="Controlled" value={value} onChange={setValue} />
    </div>
  )
}
