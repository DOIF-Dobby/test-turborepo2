'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'

export function MenuSubTrigger(
  props: React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger>,
) {
  const { children, ...otherProps } = props

  return (
    <MenuPrimitive.SubmenuTrigger {...otherProps} suppressHydrationWarning>
      {children}
    </MenuPrimitive.SubmenuTrigger>
  )
}
