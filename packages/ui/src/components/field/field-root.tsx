import { Field as FieldPrimitive } from '@base-ui/react/field'
import { swClsx } from '../../utils/clsx'
import { fieldRootVariants, type FieldRootVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof FieldPrimitive.Root>,
  keyof FieldRootVariants
> &
  FieldRootVariants

export interface FieldRootProps extends Props {
  className?: string
}

export function FieldRoot(props: FieldRootProps) {
  const { children, className, ...otherProps } = props

  const styles = fieldRootVariants({
    className,
  })

  return (
    <FieldPrimitive.Root
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
    >
      {children}
    </FieldPrimitive.Root>
  )
}
