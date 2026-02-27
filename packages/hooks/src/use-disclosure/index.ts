import { useCallback, useState } from 'react'

export interface UseDisclosureProps {
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  onOpenChange?: (isOpen: boolean) => void
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { isOpen: isOpenProp, onOpen, onClose, onOpenChange } = props

  const [isOpenState, setIsOpenState] = useState(false)

  // 외부 props가 있으면 그 값을 우선하고, 없으면 내부 상태를 사용
  const isControlled = isOpenProp !== undefined
  const isOpen = isControlled ? (isOpenProp as boolean) : isOpenState

  const open = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(true)
    }
    onOpen?.()
    onOpenChange?.(true)
  }, [isControlled, onOpen, onOpenChange])

  const close = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(false)
    }
    onClose?.()
    onOpenChange?.(false)
  }, [isControlled, onClose, onOpenChange])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
