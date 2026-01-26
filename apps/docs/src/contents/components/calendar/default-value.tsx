'use client'

import { getToday } from '@repo/date'
import { Calendar } from '@repo/ui/components/calendar'

export default function DefaultValue() {
  return <Calendar defaultValue={getToday()} />
}
