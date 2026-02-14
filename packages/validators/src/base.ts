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
