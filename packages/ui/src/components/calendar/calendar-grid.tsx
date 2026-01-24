import { getWeeksInMonth } from '@internationalized/date'
import {
  useCalendarGrid,
  useLocale,
  type AriaCalendarGridProps,
} from 'react-aria'
import type { CalendarState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { CalendarCell } from './calendar-cell'
import {
  calendarGridVariants,
  type CalendarGridSlots,
  type CalendarGridVariants,
} from './variants'

type Props = Omit<AriaCalendarGridProps, keyof CalendarGridVariants> &
  CalendarGridVariants

interface CalendarGridProps extends Props {
  state: CalendarState
  classNames?: SlotsToClasses<CalendarGridSlots>
}

export type PublicCalendarGridProps = Omit<
  CalendarGridProps,
  keyof AriaCalendarGridProps | 'state'
>

export function CalendarGrid(props: CalendarGridProps) {
  const {
    state,
    classNames,
    showDivideY = true,
    showDivideX = false,
    ...otherProps
  } = props

  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    otherProps,
    state,
  )

  // 해당 월이 몇 주인지 계산
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  const slots = calendarGridVariants({ showDivideY, showDivideX })

  return (
    <div
      {...gridProps}
      role="table"
      className={swClsx(slots.grid({ className: classNames?.grid }))}
    >
      <div
        {...headerProps}
        role="table-header"
        className={swClsx(slots.header({ className: classNames?.header }))}
      >
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={swClsx(
              slots.dayOfWeek({ className: classNames?.dayOfWeek }),
            )}
          >
            <span
              className={swClsx(
                slots.dayOfWeekContent({
                  className: classNames?.dayOfWeekContent,
                }),
              )}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className={swClsx(slots.body({ className: classNames?.body }))}>
        {[...new Array(weeksInMonth)].map((_, weekIndex) => (
          <div
            key={weekIndex}
            className={swClsx(slots.week({ className: classNames?.week }))}
          >
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <div key={i} />
                ),
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
