import { CheckIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import type { ToastItemType } from './toast-type'

export function ToastIcon({ type }: { type: ToastItemType }) {
  switch (type) {
    case 'info':
      return <ToastInfoIcon />
    case 'success':
      return <ToastSuccessIcon />
    case 'error':
      return <ToastErrorIcon />
  }
}

export function ToastSuccessIcon() {
  return (
    <div className="mt-1 flex size-5 items-center justify-center rounded-full bg-status-good">
      <CheckIcon className="size-4 stroke-background stroke-3" />
    </div>
  )
}

export function ToastErrorIcon() {
  return (
    <div className="mt-1 flex size-5 items-center justify-center rounded-full bg-status-poor">
      <AlertIcon className="size-5 stroke-background stroke-3" />
    </div>
  )
}

export function ToastInfoIcon() {
  return (
    <div className="mt-1 flex size-5 items-center justify-center rounded-full bg-base-500">
      <InfoIcon className="size-5 stroke-background stroke-3" />
    </div>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={swClsx(className)}
    >
      <line x1="12" x2="12" y1="6" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={swClsx(className)}
    >
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
