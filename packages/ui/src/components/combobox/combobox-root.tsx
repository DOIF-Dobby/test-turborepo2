'use client'

import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { getChoseong } from 'es-hangul'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { motion, type MotionProps } from 'motion/react'
import { useMemo, useRef } from 'react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Field } from '../field'
import { ScrollArea } from '../scroll-area'
import { ComboboxItem } from './combobox-item'
import {
  type ComboboxSlots,
  comboboxVariants,
  type ComboboxVariants,
} from './variants'

type DefaultItem = {
  value: string
  label: React.ReactNode
}

type Props<Multiple extends boolean | undefined> = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Root<string, Multiple>>,
  keyof ComboboxVariants | 'className' | 'disabled' | 'items'
> &
  ComboboxVariants

export interface ComboboxRootProps<
  Item extends DefaultItem = DefaultItem,
  Multiple extends boolean | undefined = false,
> extends Props<Multiple> {
  items: Item[]
  multiple?: Multiple

  classNames?: SlotsToClasses<ComboboxSlots>
  label?: React.ReactNode
  isRequired?: boolean
  placeholder?: string
  zIndex?: number
}

export function ComboboxRoot<
  Item extends DefaultItem = DefaultItem,
  Multiple extends boolean | undefined = false,
>(props: ComboboxRootProps<Item, Multiple>) {
  const {
    items,
    defaultValue,
    value: valueProp,
    onValueChange,
    multiple,

    placeholder = '선택없음',
    classNames,
    name,
    label,
    isDisabled,
    size,
    isRequired,
    disableAnimation,
    zIndex = 50,
    ...otherProps
  } = props

  const initialDefaultValue = (defaultValue ??
    (multiple ? [] : null)) as ComboboxRootProps<Item, Multiple>['value']

  const [value, setValue] = useControllableState<
    ComboboxRootProps<Item, Multiple>['value']
  >({
    value: valueProp,
    defaultValue: initialDefaultValue,
  })

  const stringItems = useMemo(
    () => items?.map((item) => item.value) || [],
    [items],
  )

  const itemsMap = useMemo(
    () => new Map(items?.map((item) => [item.value, item])),
    [items],
  )

  const positionerRef = useRef<HTMLDivElement>(null)

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const slots = comboboxVariants({
    size,
    isDisabled,
    multiple,
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

      <ComboboxPrimitive.Root
        items={stringItems}
        multiple={multiple}
        name={name}
        value={value}
        onValueChange={(val, eventDetails) => {
          onValueChange?.(val, eventDetails)
          setValue(val)
        }}
        disabled={isDisabled}
        itemToStringValue={(itemValue) => itemValue}
        itemToStringLabel={(itemValue) => {
          const item = itemsMap.get(itemValue)
          return item ? String(item.label) : itemValue
        }}
        filter={(itemValue, query, itemToString) => {
          const label = itemToString?.(itemValue)
          if (!label) {
            return false
          }

          const labelChoseong = getChoseong(label)

          return label.includes(query) || labelChoseong.includes(query)
        }}
        {...otherProps}
      >
        <div
          className={swClsx(slots.field({ className: classNames?.field }))}
          ref={positionerRef}
        >
          {multiple ? (
            <ComboboxPrimitive.Chips
              className={swClsx(slots.chips({ className: classNames?.chips }))}
            >
              <ComboboxPrimitive.Value>
                {(values: string[]) => (
                  <>
                    {values.map((value) => (
                      <ComboboxPrimitive.Chip
                        suppressHydrationWarning
                        key={value}
                        className={swClsx(
                          slots.chip({ className: classNames?.chip }),
                        )}
                        aria-label={value}
                      >
                        {itemsMap.get(value)?.label ?? value}
                        <ComboboxPrimitive.ChipRemove
                          suppressHydrationWarning
                          className={swClsx(
                            slots.chipRemove({
                              className: classNames?.chipRemove,
                            }),
                          )}
                          aria-label="Remove"
                        >
                          <XIcon
                            className={swClsx(
                              slots.chipRemoveIcon({
                                className: classNames?.chipRemoveIcon,
                              }),
                            )}
                          />
                        </ComboboxPrimitive.ChipRemove>
                      </ComboboxPrimitive.Chip>
                    ))}
                    <ComboboxPrimitive.Input
                      suppressHydrationWarning
                      placeholder={values.length > 0 ? '' : placeholder}
                      className={swClsx(
                        slots.input({ className: classNames?.input }),
                      )}
                    />
                  </>
                )}
              </ComboboxPrimitive.Value>
            </ComboboxPrimitive.Chips>
          ) : (
            <>
              <ComboboxPrimitive.Input
                suppressHydrationWarning
                placeholder={placeholder}
                className={swClsx(
                  slots.input({ className: classNames?.input }),
                )}
              />
              <ComboboxPrimitive.Clear
                suppressHydrationWarning
                className={swClsx(
                  slots.clear({ className: classNames?.clear }),
                )}
                aria-label="Clear selection"
              >
                <XIcon
                  className={swClsx(
                    slots.clearIcon({ className: classNames?.clearIcon }),
                  )}
                />
              </ComboboxPrimitive.Clear>
              <ComboboxPrimitive.Trigger
                suppressHydrationWarning
                className={swClsx(
                  slots.trigger({ className: classNames?.trigger }),
                )}
                aria-label="Open popup"
              >
                <ChevronDownIcon
                  className={swClsx(
                    slots.triggerIcon({ className: classNames?.triggerIcon }),
                  )}
                />
              </ComboboxPrimitive.Trigger>
            </>
          )}
        </div>

        <ComboboxPrimitive.Portal suppressHydrationWarning>
          <ComboboxPrimitive.Positioner
            suppressHydrationWarning
            sideOffset={4}
            anchor={positionerRef}
            style={{
              zIndex,
            }}
          >
            <ComboboxPrimitive.Popup
              suppressHydrationWarning
              className={swClsx(
                slots.content({ className: classNames?.content }),
              )}
              render={(props) => {
                return (
                  <motion.div
                    {...(props as MotionProps)}
                    initial={{
                      opacity: 0,
                      y: 'var(--y-initial, 0px)',
                      x: 'var(--x-initial, 0px)',
                    }}
                    animate={{ y: 0, x: 0, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      bounce: 0.5,
                      duration: shouldDisableAnimation ? 0 : 0.15,
                    }}
                  >
                    <ComboboxPrimitive.Empty
                      suppressHydrationWarning
                      className={swClsx(
                        slots.empty({ className: classNames?.empty }),
                      )}
                    >
                      No fruits found.
                    </ComboboxPrimitive.Empty>
                    <ScrollArea>
                      <ComboboxPrimitive.List
                        suppressHydrationWarning
                        className={swClsx(
                          slots.list({ className: classNames?.list }),
                        )}
                      >
                        {(itemValue: string) => {
                          const item = itemsMap.get(itemValue)
                          if (!item) return null

                          return (
                            <ComboboxItem key={item.value} value={itemValue}>
                              {item.label}
                            </ComboboxItem>
                          )
                        }}
                      </ComboboxPrimitive.List>
                    </ScrollArea>
                  </motion.div>
                )
              }}
            />
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </Field>
  )
}
