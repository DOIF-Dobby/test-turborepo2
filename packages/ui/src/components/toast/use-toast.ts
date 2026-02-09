'use client'

import { Toast } from '@base-ui/react/toast'
import type { ToastInput } from './toast-type'

export function useToast() {
  const manager = Toast.useToastManager()

  return {
    ...manager,
    add: (payload: ToastInput) => manager.add(payload),
  }
}
