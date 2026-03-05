import * as v from 'valibot'

/**
 * 금액 문자열
 */
export function vAmountString(
  errorMessage: string = '금액만 입력 가능합니다.',
) {
  return v.pipe(v.string(), v.regex(/^-?[\d,]*\.?\d*$/, errorMessage))
}
