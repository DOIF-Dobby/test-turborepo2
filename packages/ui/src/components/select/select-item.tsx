import { Check } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type SelectItemSlots,
  selectItemVariants,
  type SelectItemVariants,
} from './variants'

type Props = Omit<
  SelectPrimitive.SelectItemProps,
  keyof SelectItemVariants | 'className'
> &
  SelectItemVariants

export interface SelectItemProps extends Props {
  itemIndicatorIcon?: React.ReactNode
  startContent?: React.ReactNode
  classNames?: SlotsToClasses<SelectItemSlots>
}

export function SelectItem(props: SelectItemProps) {
  const {
    value,
    children,
    classNames,
    startContent,
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
      <div className="gap-sw-2xs flex min-w-0 flex-1 items-center">
        {startContent && <span className="shrink-0">{startContent}</span>}

        <span
          className={swClsx(
            slots.itemText({
              className: classNames?.itemText,
            }),
          )}
        >
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </span>
      </div>
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
