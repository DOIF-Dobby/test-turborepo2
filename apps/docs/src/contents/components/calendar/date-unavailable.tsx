'use client'

import { Calendar } from '@repo/ui/components/calendar'
import { isWeekend } from 'date-fns'

export default function DateUnavailable() {
  return <Calendar isDateUnavailable={(date) => isWeekend(date)} />
}
