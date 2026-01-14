import { useAnimate } from 'motion/react'
import { useEffect } from 'react'
import { useUIContext } from '../providers'

export interface UseScaleAnimation {
  isPressed: boolean
  scale?: number
  duration?: number
  disableAnimation?: boolean
}

export function useScaleAnimation({
  isPressed,
  scale = 0.97,
  duration = 0.2,
  disableAnimation: localDisable = false,
}: UseScaleAnimation) {
  const [scope, animate] = useAnimate()

  // 1. 훅 내부에서 전역 설정을 가져옵니다.
  const { disableAnimation: globalDisable } = useUIContext()

  // 2. 전역 설정과 로컬 설정을 비교하여 최종적으로 적용할 설정을 결정합니다.
  const isDisabled = globalDisable || localDisable

  // 3. 실제 적용할 scale과 duration을 계산합니다.
  const activeScale = isDisabled ? 1 : scale
  const activeDuration = isDisabled ? 0 : duration

  useEffect(() => {
    if (isPressed) {
      animate(
        scope.current,
        { scale: activeScale },
        { duration: activeDuration },
      )
    } else {
      animate(scope.current, { scale: 1 }, { duration: activeDuration })
    }
  }, [scope, animate, isPressed, activeDuration, activeScale])

  return {
    scope,
  }
}
