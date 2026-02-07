import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { menuItemVariants, type MenuItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.RadioItem>,
  keyof MenuItemVariants
> &
  MenuItemVariants

export interface MenuRadioItemProps extends Props {
  className?: string
}

export function MenuRadioItem(props: MenuRadioItemProps) {
  const { children, className, ...itemProps } = props

  const styles = swClsx(
    menuItemVariants({
      className,
    }),
  )

  return (
    <MenuPrimitive.RadioItem {...itemProps} className={styles}>
      {children}
      <MenuPrimitive.RadioItemIndicator>
        <CheckIcon className="size-4" />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  )
}
