import * as v from 'valibot'

/**
 * 금액 문자열 검증 스키마
 * @param options 허용 여부 옵션
 * @param errorMessage 에러 메시지
 */
export function vAmountString(
  options: {
    allowMinus?: boolean
    allowDecimal?: boolean
  } = {},
  errorMessage: string = '올바른 금액 형식이 아닙니다.',
) {
  const { allowMinus = true, allowDecimal = true } = options

  // 1. 부호 설정: allowMinus가 true면 앞에 - 허용, 아니면 아예 금지
  const sign = allowMinus ? '^-?' : '^'

  // 2. 소수점 설정: allowDecimal이 true면 .과 뒤의 숫자 허용, 아니면 금지
  const decimal = allowDecimal ? '(\\.\\d*)?$' : '$'

  // 최종 정규식 조합: 부호 + (숫자와 콤마) + 소수점
  const pattern = new RegExp(`${sign}[\\d,]*${decimal}`)

  return v.pipe(v.string(), v.regex(pattern, errorMessage))
}
