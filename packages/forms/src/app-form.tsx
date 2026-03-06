import { swClsx } from '@repo/ui/utils/clsx'
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
  className,
  onSubmit,
  ...props
}: AppFormProps<T>) {
  return (
    <form
      {...props}
      className={swClsx('gap-sw-md flex flex-col', className)}
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
