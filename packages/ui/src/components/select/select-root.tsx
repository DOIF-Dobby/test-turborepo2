'use client'

import {
  Select as SelectPrimitive,
  type SelectRootChangeEventDetails,
} from '@base-ui/react/select'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from 'lucide-react'
import { motion, type MotionProps } from 'motion/react'
import { useEffect, useMemo } from 'react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
import type { FieldState } from '../field/field-type'
import { SelectItem } from './select-item'
import {
  selectVariants,
  type SelectSlots,
  type SelectVariants,
} from './variants'

export type DefaultSelectItem = {
  value: string
  label: React.ReactNode
}

type Props<Multiple extends boolean | undefined> = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root<string, Multiple>>,
  keyof SelectVariants | 'className' | 'disabled' | 'items' | 'children'
> &
  SelectVariants &
  FieldState

export interface SelectRootProps<
  Item extends DefaultSelectItem = DefaultSelectItem,
  Multiple extends boolean | undefined = false,
> extends Props<Multiple> {
  items: Item[]
  multiple?: Multiple
  children?: (item: Item) => React.ReactNode

  classNames?: SlotsToClasses<SelectSlots>
  placeholder?: string
  startContent?: React.ReactNode
  isClearable?: boolean
  disableAnimation?: boolean
  sideOffset?: number
  label?: React.ReactNode
  isRequired?: boolean
  description?: React.ReactNode
  errorMessage?: React.ReactNode

  onClear?: () => void
}

type SelectValue<Multiple extends boolean | undefined> = SelectRootProps<
  DefaultSelectItem,
  Multiple
>['value']

function getEmptyValue<Multiple extends boolean | undefined>(
  multiple?: Multiple,
): SelectValue<Multiple> {
  return (multiple === true ? [] : null) as SelectValue<Multiple>
}

export function SelectRoot<
  Item extends DefaultSelectItem = DefaultSelectItem,
  Multiple extends boolean | undefined = false,
>(props: SelectRootProps<Item, Multiple>) {
  const {
    children,
    classNames,
    label,
    name,
    description,
    isRequired = false,
    placeholder = '선택없음',
    sideOffset = 6,
    size,
    value: valueProp,
    defaultValue,
    isDisabled,
    isDirty,
    isTouched,
    isInvalid,
    disableAnimation,
    startContent,
    isClearable = true,
    items,
    multiple,
    errorMessage,
    onValueChange,
    onClear,
    ...otherProps
  } = props

  const emptyValue = useMemo(() => getEmptyValue(multiple), [multiple])

  const [value, setValue] = useControllableState<SelectValue<Multiple>>({
    value: valueProp,
    defaultValue: defaultValue ?? emptyValue,
  })

  useEffect(() => {
    if (!multiple && valueProp === '') {
      onValueChange?.(
        null as Parameters<NonNullable<typeof onValueChange>>[0],
        {} as SelectRootChangeEventDetails,
      )
    }
  }, [valueProp, onValueChange, multiple])

  const itemsMap = useMemo(
    () => new Map(items?.map((item) => [item.value, item])),
    [items],
  )

  // Clear 핸들러
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setValue(emptyValue)
    onValueChange?.(
      emptyValue as Parameters<NonNullable<typeof onValueChange>>[0],
      {} as SelectRootChangeEventDetails,
    )
    onClear?.()
  }

  // Clear 버튼 키 이벤트
  const handleClearKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      e.preventDefault()

      setValue(emptyValue)
      onValueChange?.(
        emptyValue as Parameters<NonNullable<typeof onValueChange>>[0],
        {} as SelectRootChangeEventDetails,
      )
      onClear?.()
    }
  }

  // hasValue 체크 (배열일 땐 길이 체크)
  const hasValue = Array.isArray(value)
    ? value.length > 0
    : value !== undefined && value !== null && value !== ''

  const showClear = isClearable && hasValue && !isDisabled
  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const slots = selectVariants({
    size,
    isDisabled,
    disableAnimation: shouldDisableAnimation,
  })

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
          className={slots.label({
            className: classNames?.label,
          })}
          size={size}
          isRequired={isRequired}
        >
          {label}
        </Field.Label>
      )}

      <SelectPrimitive.Root
        items={items}
        name={name}
        value={value}
        onValueChange={(val, eventDetails) => {
          onValueChange?.(val, eventDetails)
          setValue(val)
        }}
        disabled={isDisabled}
        multiple={multiple}
        itemToStringValue={(itemValue) => itemValue}
        itemToStringLabel={(itemValue) => {
          const item = itemsMap.get(itemValue)
          return item ? String(item.label) : itemValue
        }}
        {...otherProps}
      >
        <SelectPrimitive.Trigger
          suppressHydrationWarning
          className={swClsx(slots.trigger({ className: classNames?.trigger }))}
        >
          <div className="gap-sw-2xs flex flex-1 items-center overflow-hidden">
            {startContent && <span className="shrink-0">{startContent}</span>}

            <span
              className={swClsx(slots.value({ className: classNames?.value }))}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>
          </div>

          <div className="flex items-center gap-1">
            {showClear && (
              <div
                role="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={handleClear}
                onKeyDown={handleClearKeyDown}
                className={swClsx(
                  slots.clearButton({ className: classNames?.clearButton }),
                )}
                tabIndex={0}
                aria-label="선택 초기화"
              >
                <XIcon
                  className={swClsx(
                    slots.clearIcon({ className: classNames?.clearIcon }),
                  )}
                />
              </div>
            )}

            <SelectPrimitive.Icon
              className={swClsx(
                slots.iconWrapper({ className: classNames?.iconWrapper }),
              )}
            >
              <ChevronDown
                className={swClsx(slots.icon({ className: classNames?.icon }))}
              />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal suppressHydrationWarning>
          <SelectPrimitive.Positioner
            data-slot="positioner"
            suppressHydrationWarning
            alignItemWithTrigger={false}
            align="start"
            sideOffset={sideOffset}
          >
            <SelectPrimitive.Popup
              data-slot="popup"
              suppressHydrationWarning
              className={swClsx(
                slots.content({ className: classNames?.content }),
              )}
              tabIndex={-1}
              render={(props, state) => {
                return (
                  <motion.div
                    {...(props as MotionProps)}
                    initial={{
                      opacity: 0,
                      y: 'var(--y-initial, 0px)',
                      x: 'var(--x-initial, 0px)',
                    }}
                    animate={
                      state.open
                        ? { y: 0, x: 0, opacity: 1 }
                        : {
                            opacity: 0,
                            y: 'var(--y-initial, 0px)',
                            x: 'var(--x-initial, 0px)',
                          }
                    }
                    transition={{
                      type: 'spring',
                      bounce: 0.5,
                      duration: shouldDisableAnimation ? 0 : 0.5,
                    }}
                  >
                    <SelectPrimitive.ScrollUpArrow
                      suppressHydrationWarning
                      className={swClsx(
                        slots.scrollUpArrow({
                          className: classNames?.scrollUpArrow,
                        }),
                      )}
                    >
                      <ChevronUpIcon className="size-4" />
                    </SelectPrimitive.ScrollUpArrow>
                    <SelectPrimitive.List
                      suppressHydrationWarning
                      tabIndex={-1}
                      className={swClsx(
                        slots.contentList({
                          className: classNames?.contentList,
                        }),
                      )}
                    >
                      {items.map((item) => {
                        if (children) {
                          return children(item)
                        }
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        )
                      })}
                    </SelectPrimitive.List>
                    <SelectPrimitive.ScrollDownArrow
                      suppressHydrationWarning
                      className={swClsx(
                        slots.scrollDownArrow({
                          className: classNames?.scrollDownArrow,
                        }),
                      )}
                    >
                      <ChevronDownIcon className="size-4" />
                    </SelectPrimitive.ScrollDownArrow>
                  </motion.div>
                )
              }}
            />
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {description && (
        <Field.Description
          className={slots.description({
            className: classNames?.description,
          })}
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
