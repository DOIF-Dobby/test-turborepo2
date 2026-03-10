import { swClsx } from '../../utils/clsx'
import { iconWrapperVariants, type IconWrapperVariants } from './varaints'

type Props = Omit<React.ComponentProps<'span'>, keyof IconWrapperVariants> &
  IconWrapperVariants

export interface IconWrapperProps extends Props {}

export function IconWrapper(props: IconWrapperProps) {
  const { className, children, ...rest } = props

  const styles = iconWrapperVariants({ className })

  return (
    <span className={swClsx(styles)} {...rest}>
      {children}
    </span>
  )
}
