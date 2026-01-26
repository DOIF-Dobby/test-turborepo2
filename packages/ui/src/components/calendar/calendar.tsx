'use client'

import { createCalendar } from '@repo/date'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import {
  type AriaCalendarProps,
  type DateValue,
  useCalendar,
  useLocale,
} from 'react-aria'
import { useCalendarState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { Heading5 } from '../typography'
import { getToday, toDateValue, toNativeDate } from './calendar-date-utils'
import { CalendarGrid, type PublicCalendarGridProps } from './calendar-grid'
import {
  type CalendarSlots,
  calendarVariants,
  type CalendarVariants,
} from './variants'

type OmitProps =
  | 'value'
  | 'defaultValue'
  | 'minValue'
  | 'maxValue'
  | 'focusedValue'
  | 'onChange'
  | 'isDateUnavailable'

type Props = Omit<
  AriaCalendarProps<DateValue>,
  keyof CalendarVariants | OmitProps
> &
  CalendarVariants

export interface CalendarProps extends Props {
  value?: Date
  defaultValue?: Date
  minValue?: Date
  maxValue?: Date
  focusedValue?: Date
  classNames?: SlotsToClasses<CalendarSlots>
  gridProps?: PublicCalendarGridProps
  onChange?: (value: Date) => void
  isDateUnavailable?: (value: Date) => boolean
}

// 1. 메인 캘린더 컴포넌트
export function Calendar(props: CalendarProps) {
  const {
    value,
    defaultValue,
    minValue,
    maxValue,
    focusedValue,
    classNames,
    gridProps,
    onChange,
    isDateUnavailable,
    ...otherProps
  } = props

  const ariaProps: AriaCalendarProps<DateValue> = {
    ...otherProps,
    value: toDateValue(value),
    defaultValue: toDateValue(defaultValue),
    minValue: toDateValue(minValue),
    maxValue: toDateValue(maxValue),
    focusedValue: toDateValue(focusedValue),
    isDateUnavailable: (date: DateValue) =>
      isDateUnavailable?.(toNativeDate(date)) ?? false,
    onChange: (date: DateValue) => {
      onChange?.(toNativeDate(date))
    },
  }

  const { locale } = useLocale()

  const state = useCalendarState({
    ...ariaProps,
    locale,
    createCalendar,
  })

  const ref = useRef(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(ariaProps, state)

  const today = getToday()
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
        <Button
          onPress={() => {
            state.setFocusedDate(today)
          }}
          size="xs"
          isDisabled={state.isCellUnavailable(today)}
        >
          Today
        </Button>
      </div>

      {/* 달력 그리드 영역 */}
      <CalendarGrid state={state} {...gridProps} />
    </div>
  )
}
