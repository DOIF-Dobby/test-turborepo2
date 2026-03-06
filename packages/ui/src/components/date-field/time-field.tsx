'use client'

import { Time } from '@repo/date'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useRef } from 'react'
import {
  useFocusRing,
  useLocale,
  useTimeField,
  type AriaTimeFieldProps,
} from 'react-aria'
import { useTimeFieldState } from 'react-stately'
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
  AriaTimeFieldProps<Time>,
  keyof DateFieldVariants | 'className'
> &
  DateFieldVariants &
  FieldState

export interface TimeFieldProps extends Props {
  classNames?: SlotsToClasses<DateFieldSlots>
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  inputRef?: React.RefObject<HTMLInputElement | null>
  errorMessage?: React.ReactNode
}

export function TimeField(props: TimeFieldProps) {
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
    startContent,
    endContent,
    shouldForceLeadingZeros = true,
    hourCycle = 24,
    granularity = 'second',
    inputRef: inputRefProp,
    onChange,
    ...otherProps
  } = props

  const { locale } = useLocale()

  const ariaLabelledby = otherProps['aria-labelledby'] ?? 'date-field'

  const minTime = minValue ?? new Time(0, 0, 0)
  const maxTime = maxValue ?? new Time(23, 59, 59)

  const [time, setTime] = useControllableState({
    value: valueProps,
    defaultValue: defaultValue,
    onChange: onChange,
  })

  const handleTimeChange = (newTime: Time | null) => {
    if (!newTime) {
      setTime(null)
      return
    }

    let targetTime = newTime

    if (newTime.compare(minTime) < 0) {
      targetTime = minTime as Time
    } else if (newTime.compare(maxTime) > 0) {
      targetTime = maxTime as Time
    }

    setTime(targetTime)

    if (hiddenRef.current) {
      const newValue = targetTime ? targetTime.toString() : ''
      triggerChange(hiddenRef.current, newValue)
    }
  }

  const state = useTimeFieldState({
    ...otherProps,
    description,
    label: ariaLabelledby,
    shouldForceLeadingZeros,
    value: time,
    minValue: minTime,
    maxValue: maxTime,
    isRequired,
    isDisabled,
    isReadOnly,
    hourCycle,
    granularity,
    onChange: handleTimeChange,
    locale,
  })

  const ref = useRef(null)
  const internalHiddenRef = useRef<HTMLInputElement>(null)
  const hiddenRef = inputRefProp || internalHiddenRef

  const { labelProps, fieldProps, errorMessageProps, inputProps } =
    useTimeField(
      {
        ...otherProps,
        label: ariaLabelledby,
        inputRef: hiddenRef,
      },
      state,
      ref,
    )

  const { isFocusVisible, focusProps } = useFocusRing({
    within: true,
  })

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
        data-focus-visible={isFocusVisible ? 'true' : undefined}
      >
        {startContent}
        <div
          className={slots.segmentWrapper({
            className: classNames?.segmentWrapper,
          })}
          {...focusProps}
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
        size={size}
        match={isInvalid}
        className={swClsx(
          slots.errorMessage({
            className: classNames?.errorMessage,
          }),
        )}
        errorMessage={errorMessage}
      />
    </Field>
  )
}
