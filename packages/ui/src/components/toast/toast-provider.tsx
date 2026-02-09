'use client'

import { Toast } from '@base-ui/react/toast'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import type { ToastInput, ToastPlacement } from './toast-type'
import { Toaster } from './toaster'

type ToastManagerRef = ReturnType<typeof Toast.useToastManager>

type ToastManagerContextValue = {
  managers: React.RefObject<Record<ToastPlacement, ToastManagerRef | null>>
}

const ToastManagerContext = createContext<ToastManagerContextValue | null>(null)

const PLACEMENTS: ToastPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

// 각 placement별 Provider Wrapper
function PlacementProvider({
  placement,
  onManagerReady,
}: {
  placement: ToastPlacement
  onManagerReady: (placement: ToastPlacement, manager: ToastManagerRef) => void
}) {
  return (
    <Toast.Provider>
      <PlacementToaster placement={placement} onManagerReady={onManagerReady} />
    </Toast.Provider>
  )
}

function PlacementToaster({
  placement,
  onManagerReady,
}: {
  placement: ToastPlacement
  onManagerReady: (placement: ToastPlacement, manager: ToastManagerRef) => void
}) {
  const manager = Toast.useToastManager()

  useEffect(() => {
    onManagerReady(placement, manager)
  }, [placement, manager, onManagerReady])

  return <Toaster placement={placement} />
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const managersRef = useRef<Record<ToastPlacement, ToastManagerRef | null>>({
    'top-left': null,
    'top-center': null,
    'top-right': null,
    'bottom-left': null,
    'bottom-center': null,
    'bottom-right': null,
  })

  const handleManagerReady = (
    placement: ToastPlacement,
    manager: ToastManagerRef,
  ) => {
    managersRef.current[placement] = manager
  }

  return (
    <ToastManagerContext.Provider value={{ managers: managersRef }}>
      {children}
      {PLACEMENTS.map((placement) => (
        <PlacementProvider
          key={placement}
          placement={placement}
          onManagerReady={handleManagerReady}
        />
      ))}
    </ToastManagerContext.Provider>
  )
}

// useToast 훅
export function useToast() {
  const context = useContext(ToastManagerContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return {
    add: (options: ToastInput) => {
      const placement = options.placement || 'bottom-right'
      const manager = context.managers.current[placement]
      if (manager) {
        manager.add(options)
      }
    },
  }
}
