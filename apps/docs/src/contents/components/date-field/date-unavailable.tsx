'use client'

import { isWeekend } from '@repo/date'
import { DateField } from '@repo/ui/components/date-field'

export default function DateUnavailable() {
  return <DateField isDateUnavailable={(date) => isWeekend(date)} />
}
