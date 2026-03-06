'use client'

import { getCurrentTime, type Time } from '@repo/date'
import { TimeField } from '@repo/ui/components/date-field'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<Time | null>(getCurrentTime())

  return (
    <div className="flex flex-col gap-sw-sm">
      <TimeField label="Controlled" value={value} onChange={setValue} />
      <div>선택된 값: {value?.toString()}</div>
    </div>
  )
}
