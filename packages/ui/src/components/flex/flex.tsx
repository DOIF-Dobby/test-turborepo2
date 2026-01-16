import { swClsx } from '../../utils/clsx'
import { FlexVariants, flexVariants } from './variants'

type Props = Omit<React.ComponentProps<'div'>, keyof FlexVariants> &
  FlexVariants

export interface FlexProps extends Props {}

export function Flex(props: FlexProps) {
  const { className, direction, gap, ...otherProps } = props

  const styles = flexVariants({
    direction,
    gap,
    className,
  })

  return <div className={swClsx(styles)} {...otherProps} />
}
