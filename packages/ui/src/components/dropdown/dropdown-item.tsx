import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { dropdownItemVariants, type DropdownItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof DropdownPrimitive.Item>,
  keyof DropdownItemVariants
> &
  DropdownItemVariants

export interface DropdownItemProps extends Props {}

export function DropdownItem(props: DropdownItemProps) {
  const { children, className, ...itemProps } = props

  const styles = swClsx(
    dropdownItemVariants({
      className,
    }),
  )

  return (
    <DropdownPrimitive.Item {...itemProps} className={styles}>
      {children}
    </DropdownPrimitive.Item>
  )
}
