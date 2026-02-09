import { Toast } from '@base-ui/react/toast'
import { Toaster } from './toast'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider>
      {children}
      <Toaster />
    </Toast.Provider>
  )
}
