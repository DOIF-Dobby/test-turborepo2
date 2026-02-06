'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'

export interface MenuSubRootProps extends React.ComponentProps<
  typeof MenuPrimitive.SubmenuRoot
> {}

export function MenuSubRoot(props: MenuSubRootProps) {
  const { children, ...otherProps } = props

  return (
    <MenuPrimitive.SubmenuRoot {...otherProps}>
      {children}
    </MenuPrimitive.SubmenuRoot>
  )
}
