'use client'

import { CalendarDate, createCalendar, type DateValue } from '@repo/date'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useRef } from 'react'
import { useDateField, useLocale, type AriaDateFieldProps } from 'react-aria'
import { useDateFieldState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { triggerChange } from '../date-picker/trigger-change'
import { Field } from '../field'
import type { FieldState } from '../field/field-type'
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
  DateFieldVariants &
  FieldState

export interface DateFieldProps extends Props {
  classNames?: SlotsToClasses<DateFieldSlots>
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  inputRef?: React.RefObject<HTMLInputElement | null>
  errorMessage?: React.ReactNode
  withPicker?: boolean
}

export function DateField(props: DateFieldProps) {
  const {
    classNames,
    label,
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
    isDirty,
    isTouched,
    isInvalid,
    errorMessage,
    shouldForceLeadingZeros = true,
    startContent,
    endContent,
    withPicker = false,
    inputRef: inputRefProp,
    onChange,
    isDateUnavailable,
    ...otherProps
  } = props

  const ref = useRef(null)
  const internalHiddenRef = useRef<HTMLInputElement>(null)
  const hiddenRef = inputRefProp || internalHiddenRef

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
      const newValue = targetDate ? targetDate.toString() : ''
      triggerChange(hiddenRef.current, newValue)
    }
  }

  const state = useDateFieldState({
    ...otherProps,
    description,
    label: ariaLabelledby,
    shouldForceLeadingZeros,
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
      dirty={isDirty}
      touched={isTouched}
      invalid={isInvalid}
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

      {!withPicker && description && (
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

      {!withPicker && (
        <Field.Error
          size={size}
          match={isInvalid}
          className={swClsx(
            slots.errorMessage({
              className: classNames?.errorMessage,
            }),
          )}
          errorMessage={errorMessage}
        />
      )}
    </Field>
  )
}
