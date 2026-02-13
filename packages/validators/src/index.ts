import type { DateValue } from '@repo/date'
import * as v from 'valibot'

/**
 * 필수 체크ㄴ
 */
export function vRequired(errorMessage: string) {
  return v.pipe(
    v.nullable(v.string()),
    v.custom((val) => !!val, errorMessage),
  )
}

/**
 * Checkbox, Multiple Select, Multiple Combobox 의 최소 갯수 체크
 */
export function vRequiredMultiple(errorMessage: string, min = 1) {
  return v.pipe(v.array(v.string()), v.minLength(min, errorMessage))
}

/**
 * 날짜 필수 검증
 */
export function vRequiredDate(errorMessage: string) {
  return v.custom<DateValue | null>((val) => val !== null, errorMessage)
}
