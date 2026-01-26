'use client'

import { getToday, type DateValue } from '@repo/date'
import { Calendar } from '@repo/ui/components/calendar'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<DateValue>(getToday())

  return (
    <div className="gap-sw-sm flex flex-col">
      <div>선택된 날짜: {value.toString()}</div>
      <Calendar value={value} onChange={setValue} />
    </div>
  )
}
