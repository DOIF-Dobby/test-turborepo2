'use client'

import { CalendarDate, createCalendar, type DateValue } from '@repo/date'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useRef } from 'react'
import { useDateField, useLocale, type AriaDateFieldProps } from 'react-aria'
import { useDateFieldState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
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
    name,
    description,
    value: valueProps,
    defaultValue,
    minValue,
    maxValue,
    isRequired,
    isDisabled,
    isReadOnly,
    shouldForceLeadingZeros = true,
    startContent,
    endContent,
    onChange,
    isDateUnavailable,
    ...otherProps
  } = props

  const ref = useRef(null)
  const hiddenRef = useRef<HTMLInputElement>(null)

  const { locale } = useLocale()

  const ariaLabelledby = otherProps['aria-labelledby'] ?? 'date-field'

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

    let targetDate = newDate

    if (newDate.compare(minDate) < 0) {
      targetDate = minDate
    } else if (newDate.compare(maxDate) > 0) {
      targetDate = maxDate
    }

    if (isDateUnavailable && isDateUnavailable(targetDate)) {
      return
    }

    setDate(targetDate)

    if (hiddenRef.current) {
      const input = hiddenRef.current
      input.setCustomValidity('')

      // 2. [핵심] React를 속여서 값을 변경합니다.
      // (단순 input.value = '' 하면 React가 이벤트를 씹어먹습니다)
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set

      // 값을 "2026-01-01" 처럼 유효한 값으로 강제 변경
      // (빈 문자열 ''로 바꾸면 required 조건 때문에 다시 invalid 될 수 있음)
      nativeInputValueSetter?.call(input, '2026-01-01')

      // 3. [필수] "사용자가 입력했다"고 이벤트를 뻥 쳐서 보냄
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  const state = useDateFieldState({
    ...otherProps,
    description,
    label: ariaLabelledby,
    shouldForceLeadingZeros,
    errorMessage,
    value: date ?? null,
    minValue: minDate,
    maxValue: maxDate,
    isRequired,
    isDisabled,
    isReadOnly,
    locale,
    onChange: handleDateChange,
    createCalendar,
  })

  const { labelProps, fieldProps, errorMessageProps, inputProps } =
    useDateField(
      {
        ...otherProps,
        label: ariaLabelledby,
        name,
        inputRef: hiddenRef,
      },
      state,
      ref,
    )

  const slots = dateFieldVariants({ size, isDisabled })

  return (
    <Field
      name={name}
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      {label && (
        <Field.Label
          {...labelProps}
          isRequired={isRequired}
          suppressHydrationWarning
          size={size}
          className={slots.label({ className: classNames?.label })}
        >
          {label}
        </Field.Label>
      )}

      <Field.Control
        ref={hiddenRef}
        className="peer sr-only"
        {...inputProps}
        type="text"
      />
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

      {description && (
        <Field.Description
          {...errorMessageProps}
          size={size}
          className={swClsx(
            slots.description({
              className: classNames?.description,
            }),
          )}
        >
          {description}
        </Field.Description>
      )}

      <Field.Error
        className={swClsx(
          slots.errorMessage({
            className: classNames?.errorMessage,
          }),
        )}
      />
    </Field>
  )
}
