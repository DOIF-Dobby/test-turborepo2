'use client'

import { getToday } from '@repo/date'
import { Calendar } from '@repo/ui/components/calendar'

export default function MinMaxDate() {
  const today = getToday()

  return (
    <Calendar
      minValue={today.subtract({ days: 7 })}
      maxValue={today.add({ days: 14 })}
    />
  )
}
