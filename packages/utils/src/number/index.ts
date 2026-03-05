export * from 'es-toolkit/math'

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
