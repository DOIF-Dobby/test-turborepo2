import { swClsx } from '../../utils/clsx'
import { textFieldVariants, type TextFieldVariants } from './variants'

type Props = Omit<React.ComponentProps<'input'>, keyof TextFieldVariants> &
  TextFieldVariants

export interface TextFieldProps extends Props {}

export function TextField(props: TextFieldProps) {
  const { size, className, ...otherProps } = props

  const slots = textFieldVariants({
    size,
    className,
  })

  return <input className={swClsx(slots.input())} {...otherProps} />
}
