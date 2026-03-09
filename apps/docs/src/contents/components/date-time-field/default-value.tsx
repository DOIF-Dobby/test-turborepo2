'use client'

import { getCurrentDateTime } from '@repo/date'
import { DateTimeField } from '@repo/ui/components/date-field'

export default function DefaultValue() {
  return <DateTimeField defaultValue={getCurrentDateTime()} label="Date Time" />
}
