'use client'

import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { getChoseong } from 'es-hangul'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { useMemo, useRef } from 'react'
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

type Props<M extends boolean | undefined> = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Root<string, M>>,
  keyof ComboboxVariants | 'className' | 'disabled' | 'items'
> &
  ComboboxVariants

export interface ComboboxRootProps<
  T extends DefaultItem = DefaultItem,
  M extends boolean | undefined = false,
> extends Props<M> {
  items: T[]
  classNames?: SlotsToClasses<ComboboxSlots>
  label?: React.ReactNode
  isRequired?: boolean
  placeholder?: string
}

export function ComboboxRoot<
  T extends DefaultItem = DefaultItem,
  M extends boolean | undefined = false,
>(props: ComboboxRootProps<T, M>) {
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
    ...otherProps
  } = props

  const initialDefaultValue = (defaultValue ??
    (multiple ? [] : null)) as ComboboxRootProps<T, M>['value']

  const [value, setValue] = useControllableState<
    ComboboxRootProps<T, M>['value']
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

  const slots = comboboxVariants({
    size,
    isDisabled,
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
            <ComboboxPrimitive.Chips className="flex w-64 flex-wrap items-center gap-0.5 rounded-md border border-gray-200 px-1.5 py-1 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-800 min-[500px]:w-[22rem]">
              <ComboboxPrimitive.Value>
                {(values: string[]) => (
                  <>
                    {values.map((value) => (
                      <ComboboxPrimitive.Chip
                        key={value}
                        className="flex cursor-default items-center gap-1 rounded-md bg-gray-100 px-1.5 py-[0.2rem] text-sm text-gray-900 outline-none focus-within:bg-blue-800 focus-within:text-gray-50 [@media(hover:hover)]:[&[data-highlighted]]:bg-blue-800 [@media(hover:hover)]:[&[data-highlighted]]:text-gray-50"
                        aria-label={value}
                      >
                        {itemsMap.get(value)?.label ?? value}
                        <ComboboxPrimitive.ChipRemove
                          className="rounded-md p-1 text-inherit hover:bg-gray-200"
                          aria-label="Remove"
                        >
                          <XIcon />
                        </ComboboxPrimitive.ChipRemove>
                      </ComboboxPrimitive.Chip>
                    ))}
                    <ComboboxPrimitive.Input
                      placeholder={values.length > 0 ? '' : 'e.g. TypeScript'}
                      className="h-8 min-w-12 flex-1 rounded-md border-0 bg-transparent pl-2 text-base text-gray-900 outline-none"
                    />
                  </>
                )}
              </ComboboxPrimitive.Value>
            </ComboboxPrimitive.Chips>
          ) : (
            <>
              <ComboboxPrimitive.Input
                placeholder={placeholder}
                className={swClsx(
                  slots.input({ className: classNames?.input }),
                )}
              />
              <ComboboxPrimitive.Clear
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
          >
            <ComboboxPrimitive.Popup
              suppressHydrationWarning
              className={swClsx(
                slots.content({ className: classNames?.content }),
              )}
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
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </Field>
  )
}
