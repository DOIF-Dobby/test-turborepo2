'use client'

import { Select as SelectPrimitive } from '@base-ui/react/select'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from 'lucide-react'
import { motion, type MotionProps } from 'motion/react'
import { useMemo } from 'react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
import { SelectItem } from './select-item'
import {
  selectVariants,
  type SelectSlots,
  type SelectVariants,
} from './variants'

// 기본 아이템 타입
type DefaultItem = {
  value: string
  label: React.ReactNode
}

type Props<Multiple extends boolean | undefined> = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root<string, Multiple>>,
  keyof SelectVariants | 'className' | 'disabled' | 'items' | 'children'
> &
  SelectVariants

export interface SelectRootProps<
  Item extends DefaultItem = DefaultItem,
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

  onClear?: () => void
}

export function SelectRoot<
  Item extends DefaultItem = DefaultItem,
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
    disableAnimation,
    startContent,
    isClearable = true,
    items,
    onValueChange,
    onClear,
    multiple,
    ...otherProps
  } = props

  // 초기값 설정 (멀티면 빈 배열, 싱글이면 null)
  const initialDefaultValue = (defaultValue ??
    (multiple ? [] : null)) as SelectRootProps<Item, Multiple>['value']

  const [value, setValue] = useControllableState<
    SelectRootProps<Item, Multiple>['value']
  >({
    value: valueProp,
    defaultValue: initialDefaultValue,
  })

  const itemsMap = useMemo(
    () => new Map(items?.map((item) => [item.value, item])),
    [items],
  )

  // Clear 핸들러
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    // 멀티면 [], 싱글이면 null로 초기화
    const emptyValue = (multiple ? [] : null) as SelectRootProps<
      Item,
      Multiple
    >['value']
    setValue(emptyValue)
    onClear?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      e.preventDefault()
      const emptyValue = (multiple ? [] : null) as SelectRootProps<
        Item,
        Multiple
      >['value']
      setValue(emptyValue)
      onClear?.()
    }
  }

  // hasValue 체크 (배열일 땐 길이 체크)
  const hasValue = Array.isArray(value)
    ? value.length > 0
    : value !== undefined && value !== null

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
                onKeyDown={handleKeyDown}
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

      <Field.Error />
    </Field>
  )
}
