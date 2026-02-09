import { Toast } from '@base-ui/react'
import { swClsx } from '../../utils/clsx'
import { ToastItem } from './toast-item'
import { toasterVariants } from './variants'

interface ToasterProps {
  placement?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
}

export function Toaster({ placement = 'bottom-right' }: ToasterProps) {
  const { toasts } = Toast.useToastManager()
  const slots = toasterVariants({ placement })

  const vertical = placement.startsWith('top') ? 'top' : 'bottom'

  return (
    <Toast.Portal>
      <Toast.Viewport className={swClsx(slots.viewport())}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} vertical={vertical} />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}
