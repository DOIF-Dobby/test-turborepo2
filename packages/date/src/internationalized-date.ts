import {
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  parseTime,
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

/**
 * ISO 8601 문자열(yyyy-mm-ddTHH:mm:ss)을 CalendarDate와 Time 객체로 분리하여 반환합니다.
 */
export function parseDateTimeString(dateTimeString: string) {
  // 1. 'T'를 기준으로 날짜 부분과 시간 부분을 나눕니다.
  const [datePart, timePart] = dateTimeString.split('T')

  if (!datePart || !timePart) {
    throw new Error('Invalid ISO 8601 format. Expected yyyy-mm-ddTHH:mm:ss')
  }

  // 2. 날짜 파싱 (yyyy-mm-dd) -> CalendarDate 반환
  const dateValue = parseDate(datePart)

  // 3. 시간 파싱 (HH:mm:ss) -> Time 반환
  // parseTime은 HH:mm 또는 HH:mm:ss를 모두 지원합니다.
  const timeValue = parseTime(timePart.split('.')[0]!) // 밀리초가 있을 경우를 대비해 소수점 제거

  return { dateValue, timeValue }
}

/**
 * ISO 문자열에서 날짜 부분만 추출하여 CalendarDate로 반환합니다.
 */
export function parseDateFromISO(dateTimeString: string): DateValue {
  return parseDate(dateTimeString.split('T')[0]!)
}

/**
 * ISO 문자열에서 시간 부분만 추출하여 Time으로 반환합니다.
 */
export function parseTimeFromISO(dateTimeString: string): Time {
  const timePart = dateTimeString.split('T')[1] ?? ''
  return parseTime(timePart.split('.')[0]!)
}

/**
 * DateValue와 Time 객체를 합쳐서 'yyyy-mm-ddTHH:mm:ss' 형식의 문자열로 변환합니다.
 * @param date - CalendarDate 등 DateValue 객체
 * @param time - Time 객체 (기본값: 00:00:00)
 */
export function formatToDateTimeString(
  date: DateValue,
  time: Time = new Time(0, 0, 0),
): string {
  // date.toString()은 'yyyy-mm-dd'를 반환합니다.
  const datePart = date.toString()

  // time.toString()은 'HH:mm' 또는 'HH:mm:ss'를 반환합니다.
  // 서버가 초(ss)까지 포함된 형식을 엄격하게 요구한다면 아래와 같이 수동 포맷팅이 안전합니다.
  const hh = String(time.hour).padStart(2, '0')
  const mm = String(time.minute).padStart(2, '0')
  const ss = String(time.second).padStart(2, '0')

  return `${datePart}T${hh}:${mm}:${ss}`
}
