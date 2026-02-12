import type {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  ReactNode,
} from 'react'

interface BaseFormInstance {
  handleSubmit: () => Promise<void> | void
  AppForm: ComponentType<PropsWithChildren<object>>
}

export interface AppFormProps<
  T extends BaseFormInstance,
> extends ComponentProps<'form'> {
  form: T
  children: ReactNode
}

export function AppForm<T extends BaseFormInstance>({
  children,
  form,
  onSubmit,
  ...props
}: AppFormProps<T>) {
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
        onSubmit?.(e)
      }}
    >
      <form.AppForm>{children}</form.AppForm>
    </form>
  )
}
