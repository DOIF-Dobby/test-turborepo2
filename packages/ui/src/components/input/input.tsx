import { Input as InputPrimitive } from '@base-ui/react/input'
import { swClsx } from '../../utils/clsx/clxs'
import { type InputVariants, inputVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof InputPrimitive>,
  keyof InputVariants
> &
  InputVariants

export interface InputProps extends Props {
  className?: string
}

export function Input(props: InputProps) {
  const { size, className, ...otherProps } = props

  const styles = inputVariants({
    size,
    className,
  })

  return (
    <InputPrimitive
      suppressHydrationWarning
      className={swClsx(styles)}
      {...otherProps}
    />
  )
}
