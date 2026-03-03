import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { ModalClose } from './modal-close'
import { ModalDescription } from './modal-description'
import { ModalRoot } from './modal-root'
import { ModalTitle } from './modal-title'
import { ModalTrigger } from './modal-trigger'

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
  createHandle: DialogPrimitive.createHandle,
})

export type { ModalRootProps } from './modal-root'
