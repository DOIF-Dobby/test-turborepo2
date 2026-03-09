'use client'

import { getCurrentDateTime } from '@repo/date'
import { DateTimePicker } from '@repo/ui/components/date-picker'

export default function Disabled() {
  return (
    <DateTimePicker
      label="Disable"
      isDisabled
      defaultValue={getCurrentDateTime()}
    />
  )
}
