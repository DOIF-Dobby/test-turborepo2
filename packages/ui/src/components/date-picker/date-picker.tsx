'use client'

import type { DateValue } from '@repo/date'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useRef } from 'react'
import { useDatePicker, type AriaDatePickerProps } from 'react-aria'
import { useDatePickerState } from 'react-stately'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { Label } from '../label'
import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import {
  datePickerVariants,
  type DatePickerSlots,
  type DatePickerVariants,
} from './variants'

type Props = Omit<AriaDatePickerProps<DateValue>, keyof DatePickerVariants> &
  DatePickerVariants

export interface DatePickerProps extends Props {
  classNames?: SlotsToClasses<DatePickerSlots>
  errorMessage?: React.ReactNode
}

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    size,
    classNames,
    isRequired,
    isInvalid: isInvalidProps,
    errorMessage,
    ...otherProps
  } = props

  const isInvalid = !!errorMessage || isInvalidProps

  const state = useDatePickerState({
    label,
    isRequired,
    ...otherProps,
  })
  const ref = useRef<HTMLDivElement>(null)

  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    errorMessageProps,
  } = useDatePicker(
    {
      label,
      isRequired,
      isInvalid,
      errorMessage,
      ...otherProps,
    },
    state,
    ref,
  )

  const slots = datePickerVariants({ size })

  return (
    <div
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      {label && (
        <Label
          {...labelProps}
          requiredIndicator={isRequired}
          suppressHydrationWarning
          size={size}
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
      <Popover open={state.isOpen} onOpenChange={state.setOpen}>
        <PopoverAnchor asChild>
          <div {...groupProps} ref={ref}>
            <DateField
              {...fieldProps}
              isInvalid={isInvalid}
              errorMessage={false}
              size={size}
              startContent={
                <CalendarIcon
                  className={swClsx(
                    slots.startIcon({ className: classNames?.startIcon }),
                  )}
                />
              }
              endContent={
                <Button
                  {...buttonProps}
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
              }
            />
          </div>
        </PopoverAnchor>

        <PopoverContent
          {...dialogProps}
          onPointerDownOutside={(event) => {
            if (ref.current?.contains(event.target as Node)) {
              event.preventDefault()
            }
          }}
          onFocusOutside={(event) => {
            if (ref.current?.contains(event.target as Node)) {
              event.preventDefault()
            }
          }}
        >
          <Calendar
            {...calendarProps}
            gridProps={{
              showDivideX: false,
              showDivideY: false,
            }}
          />
        </PopoverContent>
      </Popover>

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
