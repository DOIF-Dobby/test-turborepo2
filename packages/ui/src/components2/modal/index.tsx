import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { ModalDescription } from './modal-description'
import { ModalRoot } from './modal-root'
import { ModalTitle } from './modal-title'
import { ModalTrigger } from './modal-trigger'

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Title: ModalTitle,
  Description: ModalDescription,
  createHandle: DialogPrimitive.createHandle,
})
