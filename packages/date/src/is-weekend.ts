import { getDayOfWeek, type DateValue } from '@internationalized/date'

/**
 * 주어진 날짜가 주말(토, 일)인지 확인합니다.
 * @param date - DateValue (CalendarDate 등)
 * @param locale - 로케일 (기본값: 'ko-KR' - 한국 기준)
 */
export function isWeekend(date: DateValue, locale: string = 'ko-KR') {
  // ko-KR 기준:
  // getDayOfWeek는 해당 로케일의 '주의 시작 요일'을 기준으로 인덱스를 반환합니다.
  // 한국은 달력상 일요일부터 시작하므로: 0=일요일, ..., 6=토요일
  const day = getDayOfWeek(date, locale)

  // 일요일(0) 또는 토요일(6)이면 주말
  return day === 0 || day === 6
}
