/**
 * JavaScript Date 객체를 'yyyy-MM-dd HH:mm:ss' 형식의 문자열로 변환합니다.
 * (타임존 연산 없이 로컬 기기 시간 기준으로 가장 빠르게 동작합니다)
 */
export function formatDateTime(date: Date): string {
  const yyyy = date.getFullYear()
  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  const HH = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
}
