import {
  CalendarDate,
  getLocalTimeZone,
  type DateValue,
} from '@internationalized/date'

/**
 * Date -> DateValue
 */
export function toDateValue(date?: Date | null): DateValue | undefined {
  if (!date) {
    return undefined
  }

  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  )
}

/**
 * DateValue -> Date
 */
export function toNativeDate(dateValue: DateValue): Date {
  return dateValue.toDate(getLocalTimeZone())
}
