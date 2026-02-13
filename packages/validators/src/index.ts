import type { DateValue } from '@repo/date'
import * as v from 'valibot'

/**
 * 필수 체크
 */
export function vRequired(errorMessage?: string) {
  const defaultErrorMessage = '필수 입력입니다.'

  return v.pipe(
    v.nullable(v.string()),
    v.custom((val) => !!val, errorMessage ?? defaultErrorMessage),
  )
}

/**
 * Checkbox, Multiple Select, Multiple Combobox 의 최소 갯수 체크
 */
export function vRequiredMultiple(errorMessage?: string, min = 1) {
  const defaultErrorMessage = `최소 ${min}개 이상 선택해주세요.`

  return v.pipe(
    v.array(v.string()),
    v.minLength(min, errorMessage ?? defaultErrorMessage),
  )
}

/**
 * 날짜 필수 검증
 */
export function vRequiredDate(errorMessage?: string) {
  const defaultErrorMessage = '날짜를 입력해주세요.'

  return v.custom<DateValue | null>(
    (val) => val !== null,
    errorMessage ?? defaultErrorMessage,
  )
}

/**
 * 최소 날짜 검증 (minDate와 같거나 그 이후인지 체크)
 */
export function vMinDate(min: DateValue, errorMessage?: string) {
  const defaultErrorMessage = `${min.toString()} 이후 날짜를 입력해주세요.`

  return v.custom<DateValue | null>((val) => {
    const dateVal = val as DateValue | null

    // 값이 없으면 통과 (필수 체크는 vRequiredDate 몫)
    if (!dateVal) {
      return true
    }

    // val.compare(min) >= 0 이면 val이 min과 같거나 미래라는 뜻
    return dateVal.compare(min) >= 0
  }, errorMessage ?? defaultErrorMessage)
}

/**
 * 최대 날짜 검증 (maxDate와 같거나 이전인지 체크)
 */
export function vMaxDate(max: DateValue, errorMessage?: string) {
  const defaultErrorMessage = `${max.toString()} 이전 날짜를 입력해주세요.`

  return v.custom<DateValue | null>((val) => {
    const dateVal = val as DateValue | null

    // 값이 없으면 통과 (필수 체크는 vRequiredDate 몫)
    if (!dateVal) {
      return true
    }

    // val.compare(max) <= 0 이면 val이 max과 같거나 과거라는 뜻
    return dateVal.compare(max) <= 0
  }, errorMessage ?? defaultErrorMessage)
}
