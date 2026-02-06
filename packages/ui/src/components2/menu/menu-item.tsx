import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { swClsx } from '../../utils/clsx'
import { menuItemVariants, type MenuItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.Item>,
  keyof MenuItemVariants | 'className'
> &
  MenuItemVariants

export interface MenuItemProps extends Props {
  className?: string
}

export function MenuItem(props: MenuItemProps) {
  const { children, className, ...otherProps } = props

  const styles = swClsx(
    menuItemVariants({
      className,
    }),
  )

  return (
    <MenuPrimitive.Item {...otherProps} className={styles}>
      {children}
    </MenuPrimitive.Item>
  )
}
