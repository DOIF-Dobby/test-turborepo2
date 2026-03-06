import type { DateValue, Time } from '@repo/date'
import * as v from 'valibot'

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
 * 시간 필수 검증
 */
export function vRequiredTime(errorMessage?: string) {
  const defaultErrorMessage = '시간을 입력해주세요.'

  return v.custom<Time | null>(
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

/**
 * 최소 시간 검증 (minTime과 같거나 그 이후인지 체크)
 */
export function vMinTime(min: Time, errorMessage?: string) {
  const defaultErrorMessage = `${min.toString()} 이후 시간을 입력해주세요.`

  return v.custom<Time | null>((val) => {
    const timeVal = val as Time | null

    // 값이 없으면 통과 (필수 체크는 vRequiredDate 몫)
    if (!timeVal) {
      return true
    }

    // val.compare(min) >= 0 이면 val이 min과 같거나 미래라는 뜻
    return timeVal.compare(min) >= 0
  }, errorMessage ?? defaultErrorMessage)
}

/**
 * 최대 시간 검증 (maxTime과 같거나 이전인지 체크)
 */
export function vMaxTime(max: Time, errorMessage?: string) {
  const defaultErrorMessage = `${max.toString()} 이전 시간을 입력해주세요.`

  return v.custom<Time | null>((val) => {
    const timeVal = val as Time | null

    // 값이 없으면 통과 (필수 체크는 vRequiredDate 몫)
    if (!timeVal) {
      return true
    }

    // val.compare(max) <= 0 이면 val이 max과 같거나 과거라는 뜻
    return timeVal.compare(max) <= 0
  }, errorMessage ?? defaultErrorMessage)
}

/**
 * 시작일과 종료일 교차 검증 (양쪽 필드에 모두 에러 표시)
 */
export function vDateRange<TInput extends Record<string, unknown>>({
  startKey,
  endKey,
  startMessage = '시작일은 종료일 이전이어야 합니다.',
  endMessage = '종료일은 시작일 이후여야 합니다.',
}: {
  startKey: keyof TInput
  endKey: keyof TInput
  startMessage?: string
  endMessage?: string
}) {
  return v.rawCheck<TInput>(({ dataset, addIssue }) => {
    const formValue = dataset.value as TInput | undefined

    if (!formValue || !formValue[startKey] || !formValue[endKey]) {
      return
    }
    const startDate = formValue[startKey] as unknown as DateValue
    const endDate = formValue[endKey] as unknown as DateValue

    if (endDate.compare(startDate) < 0) {
      addIssue({
        message: startMessage,
        path: [
          {
            type: 'object',
            origin: 'value',
            input: formValue,
            key: startKey as string,
            value: startDate,
          },
        ],
      })

      addIssue({
        message: endMessage,
        path: [
          {
            type: 'object',
            origin: 'value',
            input: formValue,
            key: endKey as string,
            value: endDate,
          },
        ],
      })
    }
  })
}

/**
 * 시작시간과 종료시간 교차 검증 (양쪽 필드에 모두 에러 표시)
 */
export function vTimeRange<TInput extends Record<string, unknown>>({
  startKey,
  endKey,
  startMessage = '시작 시간은 종료 시간 이전이어야 합니다.',
  endMessage = '종료 시간은 시작 시간 이후여야 합니다.',
}: {
  startKey: keyof TInput
  endKey: keyof TInput
  startMessage?: string
  endMessage?: string
}) {
  return v.rawCheck<TInput>(({ dataset, addIssue }) => {
    const formValue = dataset.value as TInput | undefined

    if (!formValue || !formValue[startKey] || !formValue[endKey]) {
      return
    }
    const startTime = formValue[startKey] as unknown as Time
    const endTime = formValue[endKey] as unknown as Time

    if (endTime.compare(startTime) < 0) {
      addIssue({
        message: startMessage,
        path: [
          {
            type: 'object',
            origin: 'value',
            input: formValue,
            key: startKey as string,
            value: startTime,
          },
        ],
      })

      addIssue({
        message: endMessage,
        path: [
          {
            type: 'object',
            origin: 'value',
            input: formValue,
            key: endKey as string,
            value: endTime,
          },
        ],
      })
    }
  })
}
