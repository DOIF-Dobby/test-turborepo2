import { getLocalTimeZone, today, type CalendarDate } from '@repo/date'
import { useRef } from 'react'
import { useCalendarCell, type AriaCalendarCellProps } from 'react-aria'
import type { CalendarState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  calendarCellVariants,
  type CalendarCellSlots,
  type CalendarCellVariants,
} from './variants'

type Props = Omit<AriaCalendarCellProps, keyof CalendarCellVariants> &
  CalendarCellVariants

interface CalendarCellProps extends Props {
  state: CalendarState
  date: CalendarDate
  classNames?: SlotsToClasses<CalendarCellSlots>
}

export type PublicCalendarCellProps = Omit<
  CalendarCellProps,
  keyof AriaCalendarCellProps | keyof CalendarCellVariants | 'state' | 'date'
>

export function CalendarCell(props: CalendarCellProps) {
  const { state, date, classNames, ...otherProps } = props

  const ref = useRef<HTMLDivElement>(null)

  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date, ...otherProps }, state, ref)

  const isToday = date.compare(today(getLocalTimeZone())) === 0

  const slots = calendarCellVariants({
    isSelected,
    isDisabled,
    isUnavailable,
  })

  return (
    <div
      {...cellProps}
      className={swClsx(slots.cell({ className: classNames?.cell }))}
      data-outside-visible-range={isOutsideVisibleRange}
      data-selected={isSelected}
    >
      <div
        {...buttonProps}
        ref={ref}
        hidden={false}
        data-outside-visible-range={isOutsideVisibleRange}
        data-selected={isSelected}
        data-today={isToday}
        className={swClsx(
          slots.cellButton({ className: classNames?.cellButton }),
        )}
      >
        {formattedDate}
      </div>
    </div>
  )
}
