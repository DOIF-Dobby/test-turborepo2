import { getUniqueID } from '@repo/utils/common'
import type React from 'react'
import { useCallback, useState } from 'react'
import type { PressEvent } from 'react-aria'

export type RippleType = {
  key: React.Key
  x: number
  y: number
  size: number
}

export interface UseRippleProps {}

export function useRipple(props: UseRippleProps = {}) {
  const [ripples, setRipples] = useState<RippleType[]>([])

  const onPress = useCallback((event: PressEvent) => {
    if (event.pointerType === 'virtual') {
      return
    }

    const trigger = event.target

    const size = Math.max(trigger.clientWidth, trigger.clientHeight)

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        size,
        x: event.x - size / 2,
        y: event.y - size / 2,
      },
    ])
  }, [])

  const onClear = useCallback((key: React.Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key))
  }, [])

  return { ripples, onClear, onPress, ...props }
}

export type UseRippleReturn = ReturnType<typeof useRipple>
