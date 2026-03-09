'use client'

import { getCurrentDateTime } from '@repo/date'
import { DateTimeField } from '@repo/ui/components/date-field'

export default function ReadOnly() {
  return (
    <DateTimeField
      label="Read Only"
      isReadOnly
      defaultValue={getCurrentDateTime()}
    />
  )
}
