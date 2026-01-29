'use client'

import { getToday } from '@repo/date'
import { DatePicker } from '@repo/ui/components/date-picker'

export default function DefaultValue() {
  return <DatePicker defaultValue={getToday()} label="Default Value" />
}
