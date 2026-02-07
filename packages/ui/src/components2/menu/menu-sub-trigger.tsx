'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { swClsx } from '../../utils/clsx'
import { menuItemVariants, type MenuItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger>,
  keyof MenuItemVariants
> &
  MenuItemVariants

export interface MenuGroupLabelProps extends Props {
  className?: string
}

export function MenuSubTrigger(props: MenuGroupLabelProps) {
  const { className, children, ...otherProps } = props

  const styles = menuItemVariants({
    className,
  })

  return (
    <MenuPrimitive.SubmenuTrigger {...otherProps} className={swClsx(styles)}>
      {children}
    </MenuPrimitive.SubmenuTrigger>
  )
}
