/* eslint-disable react/prop-types */
'use client'

import { ko } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  DayFlag,
  DayPicker,
  SelectionState,
  UI,
  type DayPickerProps,
} from 'react-day-picker'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { calendarVariants, type CalendarSlots } from './variants'

const DAYS_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export type CalendarProps = DayPickerProps & {
  customClassNames?: SlotsToClasses<CalendarSlots>
  isDivide?: boolean
}

export function Calendar(props: CalendarProps) {
  const {
    classNames,
    customClassNames,
    showOutsideDays = true,
    isDivide = true,
    ...otherProps
  } = props

  // 스타일 슬롯 생성
  const slots = calendarVariants({
    isDivide,
  })

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={swClsx(slots.root({ className: customClassNames?.root }))}
      locale={ko}
      classNames={{
        // 1. Root & Navigation
        [UI.Months]: slots.months({
          className: customClassNames?.months,
        }),
        [UI.Month]: slots.month({
          className: customClassNames?.month,
        }),
        [UI.MonthCaption]: slots.monthCaption({
          className: customClassNames?.monthCaption,
        }),
        [UI.CaptionLabel]: slots.captionLabel({
          className: customClassNames?.captionLabel,
        }),
        [UI.Nav]: slots.nav({
          className: customClassNames?.nav,
        }),
        [UI.PreviousMonthButton]: slots.buttonPrevious({
          className: customClassNames?.buttonPrevious,
        }),
        [UI.NextMonthButton]: slots.buttonNext({
          className: customClassNames?.buttonNext,
        }),
        [UI.Chevron]: slots.navigationIcon({
          className: customClassNames?.navigationIcon,
        }),

        // 2. Grid (Table)
        [UI.MonthGrid]: slots.monthGrid({
          className: customClassNames?.monthGrid,
        }),
        [UI.Weekdays]: slots.weekdays({
          className: customClassNames?.weekdays,
        }),
        [UI.Weekday]: slots.weekday({
          className: customClassNames?.weekday,
        }),
        [UI.Weeks]: slots.weeks({
          className: customClassNames?.weeks,
        }),
        [UI.Week]: slots.week({
          className: customClassNames?.week,
        }),

        // 3. Day (Cell)
        [UI.Day]: slots.day({
          className: customClassNames?.day,
        }),
        [UI.DayButton]: slots.dayButton({
          className: customClassNames?.dayButton,
        }),

        // 4. Modifiers (상태값)
        [SelectionState.selected]: slots.selected({
          className: customClassNames?.selected,
        }),
        [SelectionState.range_middle]: slots.rangeMiddle({
          className: customClassNames?.rangeMiddle,
        }),
        [SelectionState.range_end]: slots.rangeEnd({
          className: customClassNames?.rangeEnd,
        }),

        [DayFlag.today]: slots.today({
          className: customClassNames?.today,
        }),
        [DayFlag.disabled]: slots.disabled({
          className: customClassNames?.disabled,
        }),
        [DayFlag.hidden]: slots.hidden({
          className: customClassNames?.hidden,
        }),

        ...classNames,
      }}
      components={{
        MonthGrid: ({ children, ...props }) => <div {...props}>{children}</div>,
        Weekdays: ({ children, ...props }) => <div {...props}>{children}</div>,
        Weekday: ({ children, ...props }) => <div {...props}>{children}</div>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Week: ({ children, week, ...props }) => {
          return <div {...props}>{children}</div>
        },
        Weeks: ({ children, ...props }) => <div {...props}>{children}</div>,

        Day: ({ children, day, modifiers, ...props }) => {
          const dayOfWeek = DAYS_OF_WEEK[day.date.getDay()]

          return (
            <div
              {...props}
              data-day-of-week={dayOfWeek}
              data-outside={modifiers.outside}
            >
              {children}
            </div>
          )
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        DayButton: ({ children, day, modifiers, ...props }) => {
          return (
            <button {...props} data-selected={modifiers.selected}>
              <span
                data-selected={modifiers.selected}
                className={swClsx(
                  slots.dayButtonText({
                    className: customClassNames?.dayButtonText,
                  }),
                )}
              >
                {children}
              </span>
            </button>
          )
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        PreviousMonthButton: ({ disabled, color, ...props }) => {
          return <Button {...props} isDisabled={disabled} variant="light" />
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        NextMonthButton: ({ disabled, color, ...props }) => {
          return <Button {...props} isDisabled={disabled} variant="light" />
        },
        Chevron: ({ orientation, ...props }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon {...props} />
        },
      }}
      {...otherProps}
    />
  )
}
