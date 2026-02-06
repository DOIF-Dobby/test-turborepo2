'use client'

import type { DateValue } from '@repo/date'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useDatePicker, type AriaDatePickerProps } from 'react-aria'
import { useDatePickerState } from 'react-stately'
import { Popover } from '../../components2/popover'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { Label } from '../label'
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
  disableAnimation?: boolean
}

export function DatePicker(props: DatePickerProps) {
  const { label, size, classNames, disableAnimation, ...otherProps } = props

  const isInvalid = !!props.errorMessage || props.isInvalid

  const state = useDatePickerState({
    label,
    isInvalid,
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
      isInvalid,
      ...otherProps,
    },
    state,
    ref,
  )

  const { disableAnimation: globalDisableAnimation } = useUIContext()

  const popoverHandle = useMemo(() => Popover.createHandle(), [])

  const slots = datePickerVariants({
    size,
    isDisabled: props.isDisabled,
    disableAnimation: disableAnimation || globalDisableAnimation,
  })

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
          requiredIndicator={props.isRequired}
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
      <div {...groupProps} ref={ref}>
        <DateField
          {...fieldProps}
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

      {props.errorMessage && (
        <div
          {...errorMessageProps}
          className={swClsx(
            slots.errorMessage({
              className: classNames?.errorMessage,
            }),
          )}
        >
          {props.errorMessage}
        </div>
      )}
    </div>
  )
}
