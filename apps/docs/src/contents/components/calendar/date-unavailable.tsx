'use client'

import { isWeekend } from '@repo/date'
import { Calendar } from '@repo/ui/components/calendar'

export default function DateUnavailable() {
  return <Calendar isDateUnavailable={(date) => isWeekend(date)} />
}
