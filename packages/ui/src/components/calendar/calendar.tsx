'use client'

import { createCalendar, type DateValue, getToday } from '@repo/date'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { type AriaCalendarProps, useCalendar, useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { Heading5 } from '../typography'
import type { PublicCalendarCellProps } from './calendar-cell'
import { CalendarGrid, type PublicCalendarGridProps } from './calendar-grid'
import {
  type CalendarSlots,
  calendarVariants,
  type CalendarVariants,
} from './variants'

type Props = Omit<AriaCalendarProps<DateValue>, keyof CalendarVariants> &
  CalendarVariants

export interface CalendarProps extends Props {
  classNames?: SlotsToClasses<CalendarSlots>
  gridProps?: PublicCalendarGridProps
  cellProps?: PublicCalendarCellProps
  showTodayButton?: boolean
}

export function Calendar(props: CalendarProps) {
  const {
    classNames,
    gridProps,
    cellProps,
    showTodayButton = true,
    ...otherProps
  } = props

  const { locale } = useLocale()

  const state = useCalendarState({
    ...otherProps,
    locale,
    createCalendar,
  })

  const ref = useRef(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(otherProps, state)

  const today = getToday(state.timeZone)
  const slots = calendarVariants({})

  return (
    <div
      suppressHydrationWarning
      {...calendarProps}
      ref={ref}
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      {/* 헤더 영역 */}
      <div
        className={swClsx(
          slots.header({
            className: classNames?.header,
          }),
        )}
      >
        <Button
          {...prevButtonProps}
          size="xs"
          isIconOnly
          variant="light"
          className={swClsx(
            slots.prevButton({
              className: classNames?.prevButton,
            }),
          )}
        >
          <ChevronLeft
            className={swClsx(
              slots.prevButtonIcon({
                className: classNames?.prevButtonIcon,
              }),
            )}
          />
        </Button>
        <Heading5
          className={swClsx(
            slots.title({
              className: classNames?.title,
            }),
          )}
        >
          {title}
        </Heading5>
        <Button
          {...nextButtonProps}
          size="xs"
          isIconOnly
          variant="light"
          className={swClsx(
            slots.nextButton({
              className: classNames?.nextButton,
            }),
          )}
        >
          <ChevronRight
            className={swClsx(
              slots.nextButtonIcon({
                className: classNames?.nextButtonIcon,
              }),
            )}
          />
        </Button>
        {showTodayButton && (
          <Button
            className={swClsx(
              slots.todayButton({
                className: classNames?.todayButton,
              }),
            )}
            onPress={() => {
              state.setFocusedDate(today)
            }}
            size="xs"
            isDisabled={state.isCellUnavailable(today)}
          >
            Today
          </Button>
        )}
      </div>

      {/* 달력 그리드 영역 */}
      <CalendarGrid state={state} cellProps={cellProps} {...gridProps} />
    </div>
  )
}
