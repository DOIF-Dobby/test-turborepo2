import type { ToastManagerAddOptions, ToastObject } from '@base-ui/react/toast'

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

type ToastPayloadInput = {
  children?: React.ReactNode
  placement?: ToastPlacement
}

export type ToastPayload = ToastObject<{}> & ToastPayloadInput

export type ToastInput = ToastManagerAddOptions<{}> & ToastPayloadInput
