'use client'

import { createCalendar, getWeeksInMonth } from '@internationalized/date'
import { useRef } from 'react'
import {
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useLocale,
} from 'react-aria'
import { useCalendarState } from 'react-stately'
import { Button } from '../button'

// 1. 메인 캘린더 컴포넌트
export function Calendar(props: any) {
  const { locale } = useLocale()

  // 상태 관리 (뇌)
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  // 캘린더 뼈대 (UI 동작)
  const ref = useRef(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state)

  return (
    <div
      {...calendarProps}
      ref={ref}
      style={{ padding: 20, border: '1px solid #ccc', display: 'inline-block' }}
    >
      {/* 헤더 영역 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Button {...prevButtonProps}>&lt; 이전</Button>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <Button {...nextButtonProps}>다음 &gt;</Button>
      </div>

      {/* 달력 그리드 영역 */}
      <CalendarGrid state={state} />
    </div>
  )
}

// 2. 그리드 컴포넌트 (달력 판)
function CalendarGrid({ state, ...props }: any) {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  // 해당 월이 몇 주인지 계산 (행 개수 결정을 위해 필요)
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table {...gridProps} cellPadding={0} cellSpacing={0}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index} style={{ padding: 8, fontSize: 12 }}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth)].map((_, weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// 3. 셀 컴포넌트 (날짜 하루하루)
function CalendarCell({ state, date }: any) {
  const ref = useRef(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange} // 이번 달이 아니면 숨김 (옵션)
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: isSelected ? 'blue' : 'transparent', // 선택되면 파란색
          color: isSelected ? 'white' : isDisabled ? '#ccc' : 'black',
          borderRadius: '50%',
        }}
      >
        {formattedDate}
      </div>
    </td>
  )
}
