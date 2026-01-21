'use client'

import { AnimatePresence, motion } from 'motion/react'
import { swClsx } from '../../utils/clsx'

interface AnimatedCheckIconProps {
  checked: boolean
  className?: string
  disableAnimation?: boolean
}

export function AnimatedCheckIcon({
  checked,
  className,
  disableAnimation,
}: AnimatedCheckIconProps) {
  const initial = disableAnimation
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: 0, opacity: 0 }

  const transition = disableAnimation ? { duration: 0 } : { duration: 0.2 }

  return (
    <AnimatePresence initial={false} mode="wait">
      {checked && (
        <motion.svg
          key="check"
          xmlns="http://www.w.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={swClsx('size-full overflow-visible', className)}
        >
          <motion.path
            d="M4 12L9 17L20 6"
            initial={initial}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{
              ...transition,
              ease: 'easeOut',
            }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  )
}
