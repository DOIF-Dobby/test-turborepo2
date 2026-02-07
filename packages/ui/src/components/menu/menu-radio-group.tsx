import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { swClsx } from '../../utils/clsx'
import { menuGroupVariants, type MenuGroupVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof MenuPrimitive.RadioGroup>,
  keyof MenuGroupVariants
> &
  MenuGroupVariants

export interface MenuRadioGroupProps extends Props {
  className?: string
}

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  const { children, className, ...groupProps } = props

  const styles = swClsx(
    menuGroupVariants({
      className,
    }),
  )

  return (
    <MenuPrimitive.RadioGroup {...groupProps} className={styles}>
      {children}
    </MenuPrimitive.RadioGroup>
  )
}
