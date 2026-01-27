import { swClsx } from '../../utils/clsx'
import { type FrameVariants, frameVariants } from './variants'

type Props = Omit<React.ComponentProps<'div'>, keyof FrameVariants> &
  FrameVariants

export interface FrameProps extends Props {}

export function Frame(props: FrameProps) {
  const { className, direction, gap, ...otherProps } = props

  const styles = frameVariants({
    direction,
    gap,
    className,
  })

  return <div className={swClsx(styles)} {...otherProps} />
}
