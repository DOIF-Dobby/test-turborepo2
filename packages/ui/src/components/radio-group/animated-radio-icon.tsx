'use client'

import { motion } from 'motion/react'
import { swClsx } from '../../utils/clsx'

interface AnimatedRadioIconProps {
  className?: string
  /** 애니메이션 비활성화 여부 */
  disableAnimation?: boolean
}

export function AnimatedRadioIcon({
  className,
  disableAnimation = false,
}: AnimatedRadioIconProps) {
  return (
    <motion.svg
      xmlns="http://www.w.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor" // 부모의 text color를 따라감
      className={swClsx('size-full', className)}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="12"
        // ✨ 애니메이션 설정
        initial={disableAnimation ? { scale: 1 } : { scale: 0 }}
        animate={{ scale: 1 }}
        // 체크박스와 비슷한 쫀득한 스프링 효과
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          // 애니메이션이 꺼져있으면 duration 0
          duration: disableAnimation ? 0 : undefined,
        }}
      />
    </motion.svg>
  )
}
