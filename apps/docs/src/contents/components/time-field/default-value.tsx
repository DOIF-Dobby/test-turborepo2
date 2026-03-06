'use client'

import { getCurrentTime } from '@repo/date'
import { TimeField } from '@repo/ui/components/date-field'

export default function DefaultValue() {
  return <TimeField defaultValue={getCurrentTime()} label="Time" />
}
