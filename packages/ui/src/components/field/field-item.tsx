import { Field as FieldPrimitive } from '@base-ui/react/field'
import { swClsx } from '../../utils/clsx'
import { type FieldItemVariants, fieldItemVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof FieldPrimitive.Item>,
  keyof FieldItemVariants
> &
  FieldItemVariants

export interface FieldItemProps extends Props {
  className?: string
}

export function FieldItem(props: FieldItemProps) {
  const { children, className, ...otherProps } = props

  const styles = fieldItemVariants({ className })

  return (
    <FieldPrimitive.Item
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
    >
      {children}
    </FieldPrimitive.Item>
  )
}
