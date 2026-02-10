import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { CheckIcon } from 'lucide-react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  comboboxItemVariants,
  type ComboboxItemSlots,
  type ComboboxItemVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof ComboboxPrimitive.Item>,
  keyof ComboboxItemVariants | 'className'
> &
  ComboboxItemVariants

interface ComboboxItemProps extends Props {
  value: string
  classNames?: SlotsToClasses<ComboboxItemSlots>
  itemIndicatorIcon?: React.ReactNode
  startContent?: React.ReactNode
}

export function ComboboxItem(props: ComboboxItemProps) {
  const {
    value,
    children,
    classNames,
    itemIndicatorIcon = <CheckIcon className="size-4" />,
    startContent,
    ref,
    ...otherProps
  } = props

  const slots = comboboxItemVariants({})

  return (
    <ComboboxPrimitive.Item
      {...otherProps}
      suppressHydrationWarning
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
            slots.itemText({ className: classNames?.itemText }),
          )}
        >
          {children}
        </span>
      </div>
      <ComboboxPrimitive.ItemIndicator
        className={swClsx(
          slots.itemIndicator({ className: classNames?.itemIndicator }),
        )}
      >
        {itemIndicatorIcon}
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}
