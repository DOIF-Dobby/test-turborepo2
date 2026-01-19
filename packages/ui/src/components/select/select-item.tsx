import { Check } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type SelectItemSlots,
  selectItemVariants,
  type SelectVariants,
} from './variants'

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  keyof SelectVariants | 'className'
> &
  SelectVariants

export interface SelectItemProps extends Props {
  itemIndicatorIcon?: React.ReactNode
  classNames?: SlotsToClasses<SelectItemSlots>
}

export function SelectItem(props: SelectItemProps) {
  const {
    value,
    children,
    classNames,
    itemIndicatorIcon = <Check className="size-4" />,
    ...otherProps
  } = props

  const slots = selectItemVariants({})

  return (
    <SelectPrimitive.Item
      value={value}
      className={swClsx(
        slots.item({
          className: classNames?.item,
        }),
      )}
      {...otherProps}
    >
      <span
        className={swClsx(
          slots.itemText({
            className: classNames?.itemText,
          }),
        )}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>

      <span
        className={swClsx(
          slots.itemIndicator({
            className: classNames?.itemIndicator,
          }),
        )}
      >
        <SelectPrimitive.ItemIndicator>
          {itemIndicatorIcon}
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}
