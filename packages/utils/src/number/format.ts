/**
 * 금액 or 비율 포맷팅
 * @param value
 * @param fixed
 * @returns
 */
export function formatAmount(
  value: string | number,
  fixed: number = 2,
): string {
  if (value === null || value === undefined || value === '') return ''
  if (value === 0 || value === '0') return '0'

  const num =
    typeof value === 'number'
      ? value
      : Number(String(value).replace(/[^-0-9.]/g, ''))
  if (!Number.isFinite(num)) return ''

  const fixedStr = num.toFixed(fixed)
  const [integerPart = '', decimalPart] = fixedStr.split('.')

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (!decimalPart) return formattedInteger

  // 소수점이 모두 0이면 정수만 반환
  const trimmedDecimal = decimalPart.replace(/0+$/, '')
  if (trimmedDecimal === '') return formattedInteger

  // 소수점이 fixed 자리 이하(2자리 이하)면 그대로 유지 (1234.5 -> 1,234.50)
  if (trimmedDecimal.length <= fixed) {
    return `${formattedInteger}.${decimalPart}`
  }

  // 소수점 3자리 이후가 모두 0이면 2자리까지만
  const afterTwo = decimalPart.slice(fixed)
  if (afterTwo.split('').every((d) => d === '0')) {
    return `${formattedInteger}.${decimalPart.slice(0, fixed)}`
  }

  // trailing zero 제거
  return `${formattedInteger}.${trimmedDecimal}`
}

/**
 * 콤마가 포함된 문자열이나 기타 포맷팅된 값을 숫자로 변환합니다.
 * @param value 변환할 문자열
 * @param fallback 변환 실패 시 반환할 기본값 (기본값: 0)
 */
export function parseAmount(
  value: string | undefined | null,
  fallback: number = 0,
): number {
  if (!value) return fallback

  // 1. 쉼표(,) 제거
  const cleanValue = value.replace(/,/g, '')

  // 2. 숫자로 변환
  const parsed = parseFloat(cleanValue)

  // 3. 변환 결과가 유효한 숫자인지 확인 (NaN 방어)
  return isNaN(parsed) ? fallback : parsed
}
