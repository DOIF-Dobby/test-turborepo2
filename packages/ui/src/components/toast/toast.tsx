'use client'

import { Toast } from '@base-ui/react/toast'
import { XIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import type { ToastPayload } from './toast-type'
import { toasterVariants, toastItemVariants } from './variants'

function ToastItem({
  toast,
  vertical,
}: {
  toast: ToastPayload
  vertical: 'top' | 'bottom'
}) {
  const slots = toastItemVariants({ vertical })

  return (
    <Toast.Root toast={toast} className={swClsx(slots.root())}>
      <Toast.Content className={swClsx(slots.content())}>
        {toast.children ? (
          toast.children
        ) : (
          <>
            <Toast.Title className={swClsx(slots.title())} />
            <Toast.Description className={swClsx(slots.description())} />
          </>
        )}
        <Toast.Close className={swClsx(slots.closeButton())} aria-label="Close">
          <XIcon className={swClsx(slots.closeIcon())} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  )
}

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
          <ToastItem
            key={toast.id}
            toast={toast}
            vertical={vertical} // 방향 전달
          />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}
