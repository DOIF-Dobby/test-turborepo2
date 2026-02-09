import { Field as FieldPrimitive } from '@base-ui/react/field'
import { swClsx } from '../../utils/clsx'

type Props = React.ComponentProps<typeof FieldPrimitive.Control>

export interface FieldControlProps extends Props {
  className?: string
}

export function FieldControl(props: FieldControlProps) {
  const { children, className, ...otherProps } = props

  return (
    <FieldPrimitive.Control
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(className)}
    >
      {children}
    </FieldPrimitive.Control>
  )
}
