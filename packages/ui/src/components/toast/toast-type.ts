import type { ToastManagerAddOptions, ToastObject } from '@base-ui/react/toast'

export type ToastPayload = ToastObject<{}> & {
  children?: React.ReactNode
}

export type ToastInput = ToastManagerAddOptions<{}> & {
  children?: React.ReactNode
}
