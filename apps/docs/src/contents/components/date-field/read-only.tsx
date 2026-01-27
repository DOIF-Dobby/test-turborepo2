'use client'

import { getToday } from '@repo/date'
import { DateField } from '@repo/ui/components/date-field'

export default function ReadOnly() {
  return <DateField label="Read Only" isReadOnly defaultValue={getToday()} />
}
