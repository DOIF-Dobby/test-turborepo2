'use client'

import { getCurrentTime } from '@repo/date'
import { TimeField } from '@repo/ui/components/date-field'

export default function ReadOnly() {
  return <TimeField label="Time" isReadOnly defaultValue={getCurrentTime()} />
}
