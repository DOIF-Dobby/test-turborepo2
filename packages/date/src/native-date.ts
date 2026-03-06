/**
 * JavaScript Date 객체를 'yyyy-MM-dd HH:mm:ss' 형식의 문자열로 변환합니다.
 * 또는 'yyyy-MM-ddTHH:mm:ss' 형식의 문자열을 'yyyy-MM-dd HH:mm:ss'로 변환합니다.
 */
export function formatDateTime(date: Date | string | undefined | null): string {
  if (!date) {
    return ''
  }

  if (typeof date === 'string') {
    return date.replace('T', ' ').split('.')[0]!
  }

  const yyyy = date.getFullYear()
  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  const HH = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
}
