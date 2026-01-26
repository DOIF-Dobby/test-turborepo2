import { getLocalTimeZone, today } from '@internationalized/date'

/**
 * @description 로컬 타임존을 기준으로 오늘 날짜를 반환합니다.
 * @param timeZone - 타임존
 * @returns 오늘 날짜
 */
export function getToday(timeZone: string = getLocalTimeZone()) {
  return today(timeZone)
}
