import { CheckIcon } from 'lucide-react'
import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { dropdownItemVariants, type DropdownItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof DropdownPrimitive.CheckboxItem>,
  keyof DropdownItemVariants
> &
  DropdownItemVariants

export interface DropdownCheckboxItemProps extends Props {
  closeOnSelect?: boolean
}

export function DropdownCheckboxItem(props: DropdownCheckboxItemProps) {
  const {
    children,
    className,
    onSelect,
    closeOnSelect = false,
    ...itemProps
  } = props

  const styles = swClsx(
    dropdownItemVariants({
      className,
    }),
  )

  return (
    <DropdownPrimitive.CheckboxItem
      {...itemProps}
      className={styles}
      onSelect={(event) => {
        if (closeOnSelect === false) {
          event.preventDefault()
        }

        onSelect?.(event)
      }}
    >
      {children}
      <DropdownPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </DropdownPrimitive.ItemIndicator>
    </DropdownPrimitive.CheckboxItem>
  )
}
