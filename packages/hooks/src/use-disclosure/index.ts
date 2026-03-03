import { useCallback, useState } from 'react'

export interface UseDisclosureProps {
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  onOpenChange?: (isOpen: boolean) => void
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    isOpen: isOpenProp,
    onOpen,
    onClose,
    onOpenChange: onOpenChangeProps,
  } = props

  const [isOpenState, setIsOpenState] = useState(false)

  // 외부 props가 있으면 그 값을 우선하고, 없으면 내부 상태를 사용
  const isControlled = isOpenProp !== undefined
  const isOpen = isControlled ? (isOpenProp as boolean) : isOpenState

  const open = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(true)
    }
    onOpen?.()
    onOpenChangeProps?.(true)
  }, [isControlled, onOpen, onOpenChangeProps])

  const close = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(false)
    }
    onClose?.()
    onOpenChangeProps?.(false)
  }, [isControlled, onClose, onOpenChangeProps])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        open()
      } else {
        close()
      }
    },
    [close, open],
  )

  return {
    isOpen,
    open,
    close,
    toggle,
    onOpenChange,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
