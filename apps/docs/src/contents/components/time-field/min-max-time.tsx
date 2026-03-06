'use client'

import { getCurrentTime } from '@repo/date'
import { TimeField } from '@repo/ui/components/date-field'

export default function MinMaxTime() {
  const currentTime = getCurrentTime()

  return (
    <TimeField
      label="Min max time"
      defaultValue={currentTime}
      minValue={currentTime.subtract({ hours: 1 })}
      maxValue={currentTime.add({ hours: 1 })}
    />
  )
}
