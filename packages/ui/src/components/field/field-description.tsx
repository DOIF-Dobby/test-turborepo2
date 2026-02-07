import { Field as FieldPrimitive } from '@base-ui/react/field'
import { swClsx } from '../../utils/clsx'
import {
  type FieldDescriptionVariants,
  fieldDescriptionVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof FieldPrimitive.Description>,
  keyof FieldDescriptionVariants
> &
  FieldDescriptionVariants

export interface FieldDescriptionProps extends Props {
  className?: string
}

export function FieldDescription(props: FieldDescriptionProps) {
  const { children, className, size, ...otherProps } = props

  const styles = fieldDescriptionVariants({ size, className })

  return (
    <FieldPrimitive.Description
      {...otherProps}
      suppressHydrationWarning
      className={swClsx(styles)}
    >
      {children}
    </FieldPrimitive.Description>
  )
}
