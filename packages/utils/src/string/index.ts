export * from 'es-toolkit/string'

/**
 * 문자열이 비어있거나 공백뿐이면 null을, 아니면 trim된 값을 반환
 */
export const nullIfEmpty = (val: string | null | undefined): string | null => {
  const trimmed = val?.trim()
  return trimmed === '' ? null : (trimmed ?? null)
}

/**
 * null이나 undefined인 경우 빈 문자열("")을 반환합니다.
 */
export const emptyIfNull = (val: string | null | undefined): string => {
  return val ?? ''
}
