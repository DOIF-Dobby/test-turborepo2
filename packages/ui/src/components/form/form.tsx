import { Form as FormPrimitive } from '@base-ui/react/form'

type Props = React.ComponentProps<typeof FormPrimitive>

export interface FormProps extends Props {}

export function Form(props: FormProps) {
  const { children, ...otherProps } = props

  return (
    <FormPrimitive suppressHydrationWarning {...otherProps}>
      {children}
    </FormPrimitive>
  )
}
