'use client'

import { Calendar } from '@repo/ui/components/calendar'
import { format } from 'date-fns'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<Date>(new Date())

  return (
    <div className="gap-sw-sm flex flex-col">
      <div>선택된 날짜: {format(value, 'yyyy-MM-dd')}</div>
      <Calendar value={value} onChange={setValue} />
    </div>
  )
}
