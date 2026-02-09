'use client'

import { Toast } from '@base-ui/react/toast'
import { XIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { ToastInfoIcon } from './toast-icon'
import type { ToastPayload } from './toast-type'
import { toastItemVariants } from './variants'

interface ToastItemProps {
  toast: ToastPayload
  vertical: 'top' | 'bottom'
}

export function ToastItem({ toast, vertical }: ToastItemProps) {
  const slots = toastItemVariants({ vertical })

  return (
    <Toast.Root toast={toast} className={swClsx(slots.root())}>
      <Toast.Content className={swClsx(slots.content())}>
        {toast.children ? (
          toast.children
        ) : (
          <>
            <ToastInfoIcon />
            <div className="gap-sw-2xs flex flex-col">
              <Toast.Title className={swClsx(slots.title())} />
              <Toast.Description className={swClsx(slots.description())} />
            </div>
          </>
        )}
        <Toast.Close className={swClsx(slots.closeButton())} aria-label="Close">
          <XIcon className={swClsx(slots.closeIcon())} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  )
}
