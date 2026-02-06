import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { menuItemVariants, type MenuItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.CheckboxItem>,
  keyof MenuItemVariants
> &
  MenuItemVariants

export interface MenuCheckboxItemProps extends Props {
  className?: string
}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const { children, className, ...itemProps } = props

  const styles = swClsx(
    menuItemVariants({
      className,
    }),
  )

  return (
    <MenuPrimitive.CheckboxItem {...itemProps} className={styles}>
      {children}
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon className="size-4" />
      </MenuPrimitive.CheckboxItemIndicator>
    </MenuPrimitive.CheckboxItem>
  )
}
