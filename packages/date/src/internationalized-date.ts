import {
  getDayOfWeek,
  getLocalTimeZone,
  Time,
  today,
  type DateValue,
} from '@internationalized/date'

/**
 * @description 로컬 타임존을 기준으로 오늘 날짜를 반환합니다.
 * @param timeZone - 타임존
 * @returns 오늘 날짜
 */
export function getToday(timeZone: string = getLocalTimeZone()) {
  return today(timeZone)
}

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

/**
 * 현재 시간을 Time 객체로 반환하는 함수입니다.
 */
export function getCurrentTime() {
  const now = new Date()

  return new Time(now.getHours(), now.getMinutes(), now.getSeconds())
}
