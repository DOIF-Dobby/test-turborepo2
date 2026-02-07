import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { swClsx } from '../../utils/clsx'
import { menuGroupLabelVariants, type MenuGroupLabelVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.GroupLabel>,
  keyof MenuGroupLabelVariants
> &
  MenuGroupLabelVariants

export interface MenuGroupLabelProps extends Props {
  className?: string
}

export const MenuGroupLabel = (props: MenuGroupLabelProps) => {
  const { className, ...otherProps } = props

  const styles = menuGroupLabelVariants({
    className,
  })

  return <MenuPrimitive.GroupLabel {...otherProps} className={swClsx(styles)} />
}
