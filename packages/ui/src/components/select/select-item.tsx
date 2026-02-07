import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CheckIcon } from 'lucide-react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  selectItemVariants,
  type SelectItemSlots,
  type SelectItemVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof SelectPrimitive.Item>,
  keyof SelectItemVariants | 'className'
> &
  SelectItemVariants

interface SelectItemProps extends Props {
  value: string
  classNames?: SlotsToClasses<SelectItemSlots>
  itemIndicatorIcon?: React.ReactNode
  startContent?: React.ReactNode
}

export function SelectItem(props: SelectItemProps) {
  const {
    value,
    children,
    classNames,
    itemIndicatorIcon = <CheckIcon className="size-4" />,
    startContent,
    ref,
    ...otherProps
  } = props

  const slots = selectItemVariants({})

  return (
    <SelectPrimitive.Item
      {...otherProps}
      ref={ref}
      value={value}
      className={swClsx(
        slots.item({
          className: classNames?.item,
        }),
      )}
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
      <SelectPrimitive.ItemIndicator
        className={swClsx(
          slots.itemIndicator({
            className: classNames?.itemIndicator,
          }),
        )}
      >
        {itemIndicatorIcon}
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
