'use client'

import { useAnimate } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useUIContext } from '../providers'

export interface UseCollapsibleAnimation {
  isOpen: boolean
  duration?: number
  disableAnimation?: boolean
}

export function useCollapsibleAnimation({
  isOpen,
  duration = 0.3,
  disableAnimation: localDisable = false,
}: UseCollapsibleAnimation) {
  const [scope, animate] = useAnimate()

  // 1. 초기 렌더링 시의 open 상태를 기억합니다.
  // 이렇게 해야 리렌더링이 되어도 initialStyle이 변하지 않아 애니메이션 충돌이 안 납니다.
  const initialOpen = useRef(isOpen)
  const isMounted = useRef(false)

  const { disableAnimation: globalDisable } = useUIContext()
  const isDisabled = globalDisable || localDisable
  const activeDuration = isDisabled ? 0 : duration

  useEffect(() => {
    // 마운트 시점에는 애니메이션 실행하지 않음 (initialStyle로 처리)
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    // 굳이 async 함수 만들 필요 없이 바로 호출하면 됩니다.
    if (isOpen) {
      // 닫힘 -> 열림
      animate(
        scope.current,
        { height: 'auto', opacity: 1 },
        { duration: activeDuration, ease: [0.4, 0, 0.2, 1] },
      )
    } else {
      // 열림 -> 닫힘
      animate(
        scope.current,
        { height: 0, opacity: 0 },
        { duration: activeDuration, ease: [0.4, 0, 0.2, 1] },
      )
    }
  }, [isOpen, activeDuration, animate, scope])

  return {
    scope,
    // 2. 초기 스타일은 'ref' 값을 사용하여 고정합니다.
    // isOpen이 바뀌어도 React가 style을 강제로 업데이트하지 않게 됩니다.
    initialStyle: {
      height: initialOpen.current ? 'auto' : 0,
      opacity: initialOpen.current ? 1 : 0,
      overflow: 'hidden',
    } as React.CSSProperties,
  }
}
