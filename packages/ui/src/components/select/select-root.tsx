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
import { motion, type HTMLMotionProps, type MotionProps } from 'motion/react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { SelectItem } from './select-item'
import {
  selectVariants,
  type SelectSlots,
  type SelectVariants,
} from './variants'

type BaseSelectProps<T, M extends boolean | undefined> = React.ComponentProps<
  typeof SelectPrimitive.Root<T, M>
>

// 기본 아이템 타입
type DefaultItem = {
  value: string
  label: React.ReactNode
}

type SelectValue<M extends boolean | undefined> = M extends true
  ? string[]
  : string | null

type Props<M extends boolean | undefined> = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root<string, M>>,
  | keyof SelectVariants
  | 'className'
  | 'disabled'
  | 'items'
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
> &
  SelectVariants

export interface SelectRootProps<
  T = DefaultItem,
  M extends boolean | undefined = false,
> extends Props<M> {
  classNames?: SlotsToClasses<SelectSlots>
  placeholder?: string
  startContent?: React.ReactNode
  isClearable?: boolean
  disableAnimation?: boolean
  errorMessage?: React.ReactNode
  sideOffset?: number

  items?: T[]

  value?: SelectValue<M>
  defaultValue?: SelectValue<M>
  onValueChange?: (
    value: SelectValue<M>,
    eventDetails: SelectRootChangeEventDetails,
  ) => void

  onClear?: () => void
  getItemValue?: (item: T) => string
  getItemLabel?: (item: T) => React.ReactNode
}

export function SelectRoot<
  T = DefaultItem,
  M extends boolean | undefined = false,
>(props: SelectRootProps<T, M>) {
  const {
    children,
    classNames,
    placeholder = '선택없음',
    sideOffset = 6,
    size,
    value: valueProp,
    defaultValue,
    isDisabled,
    isInvalid: isInvalidProp,
    disableAnimation,
    startContent,
    isClearable = true,
    errorMessage,
    items,
    onValueChange,
    onClear,
    multiple,
    getItemValue = (item: T) => (item as DefaultItem).value,
    getItemLabel = (item: T) => (item as DefaultItem).label,
    ...otherProps
  } = props

  // 초기값 설정 (멀티면 빈 배열, 싱글이면 null)
  const initialDefaultValue = (defaultValue ??
    (multiple ? [] : null)) as SelectValue<M>

  const [value, setValue] = useControllableState<SelectValue<M>>({
    value: valueProp,
    defaultValue: initialDefaultValue,
  })

  const getDisplayLabel = () => {
    if (!items || value === null || value === undefined) return null

    if (Array.isArray(value)) {
      if (value.length === 0) return null
      return value
        .map((val) => items.find((item) => getItemValue(item) === val))
        .filter(Boolean)
        .map((item) => getItemLabel(item!))
        .join(', ')
    } else {
      const selectedItem = items.find((item) => getItemValue(item) === value)
      return selectedItem ? getItemLabel(selectedItem) : null
    }
  }

  const displayLabel = getDisplayLabel()

  // Clear 핸들러
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    // 멀티면 [], 싱글이면 null로 초기화
    const emptyValue = (multiple ? [] : null) as SelectValue<M>
    setValue(emptyValue)
    onClear?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      e.preventDefault()
      const emptyValue = (multiple ? [] : null) as SelectValue<M>
      setValue(emptyValue)
      onClear?.()
    }
  }

  // hasValue 체크 (배열일 땐 길이 체크)
  const hasValue = Array.isArray(value)
    ? value.length > 0
    : value !== undefined && value !== null

  const showClear = isClearable && hasValue && !isDisabled
  const isInvalid = isInvalidProp || errorMessage !== undefined
  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  // 자식 아이템 렌더링
  const childrenItems = children
    ? children
    : items?.map((item) => {
        const itemValue = getItemValue(item)
        return (
          <SelectItem key={itemValue} value={itemValue}>
            {getItemLabel(item)}
          </SelectItem>
        )
      })

  const slots = selectVariants({
    size,
    isDisabled,
    isInvalid,
    disableAnimation: shouldDisableAnimation,
  })

  return (
    <div
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <SelectPrimitive.Root<string, M>
        value={value as BaseSelectProps<string, M>['value']}
        onValueChange={(val, eventDetails) => {
          onValueChange?.(val, eventDetails)
          setValue(val)
        }}
        disabled={isDisabled}
        multiple={multiple}
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
              {/* items가 있으면 계산된 displayLabel 사용 */}
              {items ? (
                displayLabel || placeholder
              ) : (
                <SelectPrimitive.Value placeholder={placeholder} />
              )}
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
                const motionProps: HTMLMotionProps<'div'> = {
                  initial: false,
                  animate: state.open
                    ? { opacity: 1, y: 0, x: 0 }
                    : {
                        opacity: 0,
                        y: 'var(--y-initial, 0px)',
                        x: 'var(--x-initial, 0px)',
                      },
                  transition: { duration: shouldDisableAnimation ? 0 : 0.15 },
                }

                return (
                  <motion.div {...(props as MotionProps)} {...motionProps}>
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
                      {childrenItems}
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
    </div>
  )
}
