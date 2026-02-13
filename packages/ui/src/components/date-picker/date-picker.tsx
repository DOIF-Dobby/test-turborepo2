'use client'

import type { DateValue } from '@repo/date'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useDatePicker, type AriaDatePickerProps } from 'react-aria'
import { useDatePickerState } from 'react-stately'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { Field } from '../field'
import type { FieldState } from '../field/field-type'
import { Popover } from '../popover'
import { triggerChange } from './trigger-change'
import {
  datePickerVariants,
  type DatePickerSlots,
  type DatePickerVariants,
} from './variants'

type Props = Omit<AriaDatePickerProps<DateValue>, keyof DatePickerVariants> &
  DatePickerVariants &
  FieldState

export interface DatePickerProps extends Props {
  classNames?: SlotsToClasses<DatePickerSlots>
  errorMessage?: React.ReactNode
  disableAnimation?: boolean
}

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    size,
    classNames,
    disableAnimation,
    isDirty,
    isTouched,
    isInvalid,
    errorMessage,
    ...otherProps
  } = props

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const state = useDatePickerState({
    label,
    isInvalid,
    ...otherProps,
    onChange: (newDate) => {
      props.onChange?.(newDate)

      if (hiddenInputRef.current) {
        const newValue = newDate ? newDate.toString() : ''
        triggerChange(hiddenInputRef.current, newValue)
      }
    },
  })
  const ref = useRef<HTMLDivElement>(null)

  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(
    {
      label,
      isInvalid,
      ...otherProps,
    },
    state,
    ref,
  )

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const popoverHandle = useMemo(() => Popover.createHandle(), [])

  const slots = datePickerVariants({
    size,
    isDisabled: props.isDisabled,
    disableAnimation: shouldDisableAnimation,
  })

  return (
    <Field
      name={props.name}
      dirty={isDirty}
      touched={isTouched}
      invalid={isInvalid}
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      {label && (
        <Field.Label
          {...labelProps}
          isRequired={props.isRequired}
          suppressHydrationWarning
          size={size}
          className={slots.label({ className: classNames?.label })}
        >
          {label}
        </Field.Label>
      )}
      <div suppressHydrationWarning {...groupProps} ref={ref}>
        <DateField
          {...fieldProps}
          withPicker
          name={props.name}
          inputRef={hiddenInputRef}
          isInvalid={isInvalid}
          errorMessage={false}
          size={size}
          minValue={props.minValue}
          maxValue={props.maxValue}
          isDateUnavailable={props.isDateUnavailable}
          startContent={
            <CalendarIcon
              className={swClsx(
                slots.startIcon({ className: classNames?.startIcon }),
              )}
            />
          }
          endContent={
            <Popover.Trigger handle={popoverHandle}>
              <Button
                {...buttonProps}
                disableAnimation={disableAnimation}
                onPress={() => state.setOpen(!state.isOpen)}
                isIconOnly
                variant="light"
                className={swClsx(
                  slots.openButton({ className: classNames?.openButton }),
                )}
              >
                <ChevronDownIcon
                  className={swClsx(
                    slots.endIcon({ className: classNames?.endIcon }),
                  )}
                />
              </Button>
            </Popover.Trigger>
          }
        />
      </div>

      {props.description && (
        <Field.Description
          size={size}
          className={swClsx(
            slots.description({
              className: classNames?.description,
            }),
          )}
        >
          {props.description}
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

      <Popover
        handle={popoverHandle}
        open={state.isOpen}
        onOpenChange={state.setOpen}
      >
        <Popover.Content
          {...dialogProps}
          align="start"
          side="bottom"
          disableAnimation={disableAnimation}
          anchor={ref}
          showArrow={false}
        >
          <Calendar
            {...calendarProps}
            classNames={{
              container: 'px-sw-2xs gap-sw-xs w-68',
              header: 'justify-center gap-sw-2xs',
              todayButton: 'w-16',
            }}
            gridProps={{
              showDivideX: false,
              showDivideY: false,
              classNames: {
                grid: 'gap-sw-3xs',
                dayOfWeekContent:
                  'text-paragraph-4 font-paragraph-4 leading-paragraph-4',
              },
            }}
            cellProps={{
              classNames: {
                cell: 'aspect-5/4 flex items-center justify-center',
                cellButton: [
                  'text-paragraph-1 font-paragraph-1 leading-paragraph-1',
                  'hover:bg-base-200',
                ],
              },
            }}
          />
        </Popover.Content>
      </Popover>
    </Field>
  )
}
