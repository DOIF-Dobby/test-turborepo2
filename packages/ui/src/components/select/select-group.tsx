import { Select as SelectPrimitive } from '@base-ui/react/select'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type SelectGroupSlots,
  selectGroupVariants,
  type SelectGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof SelectPrimitive.Group>,
  keyof SelectGroupVariants
> &
  SelectGroupVariants

interface SelectGroupProps extends Props {
  label: React.ReactNode
  classNames?: SlotsToClasses<SelectGroupSlots>
}

export function SelectGroup(props: SelectGroupProps) {
  const { children, label, classNames, ...otherProps } = props

  const slots = selectGroupVariants({})

  return (
    <SelectPrimitive.Group
      suppressHydrationWarning
      {...otherProps}
      className={swClsx(slots.group({ className: classNames?.group }))}
    >
      <SelectPrimitive.GroupLabel
        suppressHydrationWarning
        className={swClsx(
          slots.label({
            className: classNames?.label,
          }),
        )}
      >
        {label}
      </SelectPrimitive.GroupLabel>
      {children}
    </SelectPrimitive.Group>
  )
}
