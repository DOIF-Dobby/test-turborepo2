import type { ToastManagerUpdateOptions } from '@base-ui/react'
import type { ToastManagerAddOptions, ToastObject } from '@base-ui/react/toast'
import type { SlotsToClasses } from '../../types'
import type { ToastItemSlots } from './variants'

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastItemType = 'info' | 'success' | 'error'

type ToastPayloadInput = {
  children?: React.ReactNode
  placement?: ToastPlacement
  showCloseButton?: boolean
  classNames?: SlotsToClasses<ToastItemSlots>
  itemType?: ToastItemType
}

export type ToastPayload = ToastObject<{}> & ToastPayloadInput

export type ToastAddOptions = ToastManagerAddOptions<{}> & ToastPayloadInput

export type ToastUpdateOptions = ToastManagerUpdateOptions<{}> &
  ToastPayloadInput

export type ToastCloseOptions = {
  placement?: ToastPlacement
}
