'use client'

import { Toast } from '@base-ui/react/toast'
import { XIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { ToastIcon } from './toast-icon'
import type { ToastPayload } from './toast-type'
import { toastItemVariants } from './variants'

interface ToastItemProps {
  toast: ToastPayload
  vertical: 'top' | 'bottom'
}

export function ToastItem({ toast, vertical }: ToastItemProps) {
  const slots = toastItemVariants({ vertical })

  const { children, showCloseButton = true, itemType, classNames } = toast

  return (
    <Toast.Root
      toast={toast}
      className={swClsx(slots.root({ className: classNames?.root }))}
    >
      <Toast.Content
        className={swClsx(slots.content({ className: classNames?.content }))}
      >
        {children ? (
          children
        ) : (
          <>
            {itemType && <ToastIcon type={itemType} />}
            <div className="gap-sw-2xs flex flex-col">
              <Toast.Title
                className={swClsx(
                  slots.title({ className: classNames?.title }),
                )}
              />
              <Toast.Description
                className={swClsx(
                  slots.description({ className: classNames?.description }),
                )}
              />
            </div>
          </>
        )}
        {showCloseButton && (
          <Toast.Close
            className={swClsx(
              slots.closeButton({ className: classNames?.closeButton }),
            )}
            aria-label="Close"
          >
            <XIcon
              className={swClsx(
                slots.closeIcon({ className: classNames?.closeIcon }),
              )}
            />
          </Toast.Close>
        )}
      </Toast.Content>
    </Toast.Root>
  )
}
