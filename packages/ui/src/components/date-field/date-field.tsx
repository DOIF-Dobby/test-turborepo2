'use client'

import { CalendarDate, createCalendar, type DateValue } from '@repo/date'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useRef } from 'react'
import { useDateField, useLocale, type AriaDateFieldProps } from 'react-aria'
import { useDateFieldState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Label } from '../label'
import { DateSegment } from './date-segment'
import {
  dateFieldVariants,
  type DateFieldSlots,
  type DateFieldVariants,
} from './variants'

type Props = Omit<
  AriaDateFieldProps<DateValue>,
  keyof DateFieldVariants | 'className'
> &
  DateFieldVariants

export interface DateFieldProps extends Props {
  classNames?: SlotsToClasses<DateFieldSlots>
  errorMessage?: React.ReactNode
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

export function DateField(props: DateFieldProps) {
  const {
    classNames,
    label,
    errorMessage,
    size,
    value: valueProps,
    defaultValue,
    minValue,
    maxValue,
    isRequired,
    isDisabled,
    isReadOnly,
    isInvalid: isInvalidProps,
    shouldForceLeadingZeros = true,
    startContent,
    endContent,
    onChange,
    ...otherProps
  } = props

  const { locale } = useLocale()

  const ariaLabelledby = otherProps['aria-labelledby'] ?? 'date-field'
  const isInvalid = !!errorMessage || isInvalidProps

  const minDate = minValue ?? new CalendarDate(1, 1, 1)
  const maxDate = maxValue ?? new CalendarDate(9999, 12, 31)

  const [date, setDate] = useControllableState({
    value: valueProps,
    defaultValue: defaultValue,
    onChange: onChange,
  })

  const handleDateChange = (newDate: DateValue | null) => {
    if (!newDate) {
      setDate(null)
      return
    }

    if (newDate.compare(minDate) < 0) {
      setDate(minDate) // 너무 작으면 minDate로 고정
    } else if (newDate.compare(maxDate) > 0) {
      setDate(maxDate) // 너무 크면 maxDate로 고정
    } else {
      setDate(newDate) // 통과
    }
  }

  const state = useDateFieldState({
    ...otherProps,
    label: ariaLabelledby,
    shouldForceLeadingZeros,
    errorMessage,
    value: date ?? null,
    minValue: minDate,
    maxValue: maxDate,
    isRequired,
    isDisabled,
    isReadOnly,
    isInvalid,
    locale,
    onChange: handleDateChange,
    createCalendar,
  })

  const ref = useRef(null)

  const { labelProps, fieldProps, errorMessageProps } = useDateField(
    {
      ...otherProps,
      label: ariaLabelledby,
    },
    state,
    ref,
  )

  const slots = dateFieldVariants({ size, isDisabled, isInvalid })

  return (
    <div className={slots.container({ className: classNames?.container })}>
      {label && (
        <Label
          requiredIndicator={isRequired}
          suppressHydrationWarning
          size={size}
          {...labelProps}
          classNames={{
            label: slots.label({ className: classNames?.label }),
            indicator: slots.labelIndicator({
              className: classNames?.labelIndicator,
            }),
          }}
        >
          {label}
        </Label>
      )}
      <div
        suppressHydrationWarning
        {...fieldProps}
        ref={ref}
        className={swClsx(
          slots.fieldWrapper({
            className: classNames?.fieldWrapper,
          }),
        )}
      >
        {startContent}
        <div
          className={slots.segmentWrapper({
            className: classNames?.segmentWrapper,
          })}
        >
          {state.segments.map((segment, i) => (
            <DateSegment
              key={i}
              segment={segment}
              state={state}
              className={swClsx(
                slots.segment({ className: classNames?.segment }),
              )}
            />
          ))}
        </div>
        {endContent}
      </div>

      {/* 에러 메시지 */}
      {errorMessage && (
        <div
          {...errorMessageProps}
          className={swClsx(
            slots.errorMessage({
              className: classNames?.errorMessage,
            }),
          )}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}
