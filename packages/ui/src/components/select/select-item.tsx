import { Select as SelectPrimitive } from 'radix-ui'
import type { SelectVariants } from './variants'

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  keyof SelectVariants
> &
  SelectVariants

export interface SelectItemProps extends Props {}

export function SelectItem(props: SelectItemProps) {
  const { value, children, ...otherProps } = props

  return (
    <SelectPrimitive.Item value={value} {...otherProps}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
