'use client'

import { clamp } from '@repo/utils/number'
import {
  AnimatePresence,
  domAnimation,
  type HTMLMotionProps,
  LazyMotion,
  m,
} from 'motion/react'
import type { RippleType } from './use-ripple'

export interface RippleProps {
  ripples: RippleType[]
  color?: string
  motionProps?: HTMLMotionProps<'span'>
  style?: React.CSSProperties
  onClear: (key: React.Key) => void
}

export function Ripple(props: RippleProps) {
  const {
    ripples = [],
    motionProps,
    color = 'currentColor',
    style,
    onClear,
  } = props

  return (
    // 1. LazyMotion과 AnimatePresence는 루프 바깥으로 이동
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="popLayout">
        {ripples.map((ripple) => {
          const duration = clamp(
            0.01 * ripple.size,
            0.2,
            ripple.size > 100 ? 0.75 : 0.5,
          )

          return (
            <m.span
              key={ripple.key}
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
              initial={{ transform: 'scale(0)', opacity: 0.35 }}
              animate={{ transform: 'scale(2)', opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
              onAnimationComplete={() => onClear(ripple.key)}
              style={{
                // 2. 동적 스타일만 인라인으로 적용
                backgroundColor: color,
                top: ripple.y,
                left: ripple.x,
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                transformOrigin: 'center',
                ...style, // 사용자가 넘긴 커스텀 스타일 병합
              }}
              {...motionProps}
            />
          )
        })}
      </AnimatePresence>
    </LazyMotion>
  )
}
