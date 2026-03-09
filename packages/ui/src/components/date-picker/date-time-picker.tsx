'use client'

import { CalendarClockIcon } from 'lucide-react'
import { useCallback } from 'react'
import { DatePicker, type DatePickerProps } from './date-picker'

type Props = DatePickerProps

export interface DateTimePickerProps extends Props {}

export function DateTimePicker(props: DateTimePickerProps) {
  const {
    granularity = 'second',
    hourCycle = 24,
    startContent,
    ...otherProps
  } = props

  const startContentNode = useCallback(
    (className: string) => {
      if (!startContent) {
        return <CalendarClockIcon className={className} />
      }

      return startContent(className)
    },
    [startContent],
  )

  return (
    <DatePicker
      granularity={granularity}
      hourCycle={hourCycle}
      startContent={startContentNode}
      {...otherProps}
    />
  )
}
