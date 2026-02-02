import { CheckIcon } from 'lucide-react'
import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { dropdownItemVariants, type DropdownItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof DropdownPrimitive.RadioItem>,
  keyof DropdownItemVariants
> &
  DropdownItemVariants

export interface DropdownRadioItemProps extends Props {}

export function DropdownRadioItem(props: DropdownRadioItemProps) {
  const { children, className, ...itemProps } = props

  const styles = swClsx(
    dropdownItemVariants({
      className,
    }),
  )

  return (
    <DropdownPrimitive.RadioItem {...itemProps} className={styles}>
      {children}
      <DropdownPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </DropdownPrimitive.ItemIndicator>
    </DropdownPrimitive.RadioItem>
  )
}
