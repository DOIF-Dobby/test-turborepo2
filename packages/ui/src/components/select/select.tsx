import { ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Label } from '../label'
import {
  type SelectSlots,
  selectVariants,
  type SelectVariants,
} from './variants'

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
  keyof SelectVariants | 'className'
> &
  SelectVariants

export interface SelectProps extends Props {
  label?: React.ReactNode
  classNames?: SlotsToClasses<SelectSlots>
  isRequired?: boolean
  errorMessage?: React.ReactNode
  placeholder?: string
}

export function Select(props: SelectProps) {
  const {
    children,
    size,
    label,
    classNames,
    isRequired = false,
    errorMessage,
    placeholder = '선택없음',
    ...otherProps
  } = props

  // 에러 상태 판단
  const isInvalid = errorMessage !== undefined

  const slots = selectVariants({
    size,
    isInvalid,
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
          classNames={{
            label: slots.label({
              className: classNames?.label,
            }),
            indicator: slots.labelIndicator({
              className: classNames?.labelIndicator,
            }),
          }}
          size={size}
          requiredIndicator={isRequired}
        >
          {label}
        </Label>
      )}
      <SelectPrimitive.Root {...otherProps}>
        <SelectPrimitive.Trigger
          suppressHydrationWarning
          className={swClsx(
            slots.trigger({
              className: classNames?.trigger,
            }),
          )}
        >
          <span
            className={swClsx(slots.value({ className: classNames?.value }))}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>

          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className={swClsx(slots.icon({ className: classNames?.icon }))}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className={swClsx(
              slots.content({
                className: classNames?.content,
              }),
            )}
          >
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {errorMessage && (
        <div
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
