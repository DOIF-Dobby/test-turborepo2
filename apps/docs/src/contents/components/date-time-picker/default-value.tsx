'use client'

import { getCurrentDateTime } from '@repo/date'
import { DateTimePicker } from '@repo/ui/components/date-picker'

export default function DefaultValue() {
  return (
    <DateTimePicker defaultValue={getCurrentDateTime()} label="Default Value" />
  )
}
