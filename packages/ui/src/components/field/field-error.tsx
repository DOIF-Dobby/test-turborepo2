import { Field as FieldPrimitive } from '@base-ui/react/field'
import { swClsx } from '../../utils/clsx'
import { type FieldErrorVariants, fieldErrorVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof FieldPrimitive.Error>,
  keyof FieldErrorVariants
> &
  FieldErrorVariants

export interface FieldErrorProps extends Props {
  className?: string
}

export function FieldError(props: FieldErrorProps) {
  const { className, size, ...otherProps } = props

  const styles = fieldErrorVariants({ size, className })

  return (
    <FieldPrimitive.Error
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
    />
  )
}
