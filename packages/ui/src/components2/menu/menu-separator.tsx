import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { swClsx } from '../../utils/clsx'
import { menuSeparatorVariants, type MenuSeparatorVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.Separator>,
  keyof MenuSeparatorVariants
> &
  MenuSeparatorVariants

export interface MenuSeparatorProps extends Props {
  className?: string
}

export function MenuSeparator(props: MenuSeparatorProps) {
  const { className, ...otherProps } = props

  const styles = menuSeparatorVariants({
    className,
  })

  return <MenuPrimitive.Separator {...otherProps} className={swClsx(styles)} />
}
