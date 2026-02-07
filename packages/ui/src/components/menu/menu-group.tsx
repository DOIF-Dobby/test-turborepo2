import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { swClsx } from '../../utils/clsx'
import { menuGroupVariants, type MenuGroupVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.Group>,
  keyof MenuGroupVariants
> &
  MenuGroupVariants

export interface MenuGroupProps extends Props {
  className?: string
}

export function MenuGroup(props: MenuGroupProps) {
  const { children, className, ...groupProps } = props

  const styles = swClsx(
    menuGroupVariants({
      className,
    }),
  )

  return (
    <MenuPrimitive.Group {...groupProps} className={styles}>
      {children}
    </MenuPrimitive.Group>
  )
}
