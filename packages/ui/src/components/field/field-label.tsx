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
  isRequired?: boolean
  requiredIndicator?: React.ReactNode
}

export function FieldLabel(props: FieldLabelProps) {
  const {
    children,
    className,
    size,
    isRequired,
    requiredIndicator = <span className="text-destructive">*</span>,
    ...otherProps
  } = props

  const styles = fieldLabelVariants({ size, className })

  return (
    <FieldPrimitive.Label
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
    >
      {children}
      {isRequired && requiredIndicator}
    </FieldPrimitive.Label>
  )
}
