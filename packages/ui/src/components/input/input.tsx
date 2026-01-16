import { swClsx } from '../../utils/clsx/clxs'
import { type InputVariants, inputVariants } from './variants'

type Props = Omit<React.ComponentProps<'input'>, keyof InputVariants> &
  InputVariants

export interface InputProps extends Props {}

export function Input(props: InputProps) {
  const { color, className, ...otherProps } = props

  const styles = inputVariants({
    color,
    className,
  })

  return <input className={swClsx(styles)} {...otherProps} />
}
