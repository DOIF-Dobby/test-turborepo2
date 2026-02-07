'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'
import { motion, type MotionProps } from 'motion/react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import { swClsx } from '../../utils/clsx'

export interface CollapsiblePanelProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Panel
> {
  disableAnimation?: boolean
}

export function CollapsiblePanel(props: CollapsiblePanelProps) {
  const { children, className, disableAnimation, ...otherProps } = props

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  return (
    <CollapsiblePrimitive.Panel
      {...otherProps}
      suppressHydrationWarning
      keepMounted
      className={swClsx('overflow-hidden', className)}
      render={(panelProps, state) => {
        return (
          <motion.div
            {...(panelProps as MotionProps)}
            initial={false}
            animate={{
              height: state.open ? 'auto' : 0,
              opacity: state.open ? 1 : 0,
            }}
            transition={{
              duration: shouldDisableAnimation ? 0 : 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            hidden={disableAnimation ? panelProps.hidden : false}
          >
            <div className="min-h-0">{children}</div>
          </motion.div>
        )
      }}
    />
  )
}
