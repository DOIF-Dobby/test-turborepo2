'use client'

import { getToday } from '@repo/date'
import { DateField } from '@repo/ui/components/date-field'

export default function DefaultValue() {
  return <DateField defaultValue={getToday()} label="Date" />
}
