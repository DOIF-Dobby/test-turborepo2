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
  errorMessage?: React.ReactNode
}

export function FieldError(props: FieldErrorProps) {
  const { className, size, render, errorMessage, ...otherProps } = props

  const styles = fieldErrorVariants({ size, className })

  return (
    <FieldPrimitive.Error
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
      render={
        render
          ? render
          : (errorProps) => {
              const { children, ...otherProps } = errorProps
              const renderedChildren = errorMessage ?? children
              return <div {...otherProps}>{renderedChildren}</div>
            }
      }
    />
  )
}
