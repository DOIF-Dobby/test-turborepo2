import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { dropdownGroupVariants, type DropdownGroupVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof DropdownPrimitive.Group>,
  keyof DropdownGroupVariants
> &
  DropdownGroupVariants

export interface DropdownGroupProps extends Props {}

export function DropdownGroup(props: DropdownGroupProps) {
  const { children, className, ...groupProps } = props

  const styles = swClsx(
    dropdownGroupVariants({
      className,
    }),
  )

  return (
    <DropdownPrimitive.Group {...groupProps} className={styles}>
      {children}
    </DropdownPrimitive.Group>
  )
}
