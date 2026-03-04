import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import type { MenubarVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenubarPrimitive>,
  keyof MenubarVariants
> &
  MenubarVariants

export interface MenubarProps extends Props {}

export function Menubar({ children, ...props }: MenubarProps) {
  return (
    <MenubarPrimitive suppressHydrationWarning {...props}>
      {children}
    </MenubarPrimitive>
  )
}
