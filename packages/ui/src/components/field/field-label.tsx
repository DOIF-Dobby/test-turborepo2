import { Field as FieldPrimitive } from '@base-ui/react/field'
import { swClsx } from '../../utils/clsx'
import { type FieldLabelVariants, fieldLabelVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof FieldPrimitive.Label>,
  keyof FieldLabelVariants
> &
  FieldLabelVariants

export interface FieldLabelProps extends Props {
  className?: string
}

export function FieldLabel(props: FieldLabelProps) {
  const { children, className, size, ...otherProps } = props

  const styles = fieldLabelVariants({ size, className })

  return (
    <FieldPrimitive.Label
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
    >
      {children}
    </FieldPrimitive.Label>
  )
}
