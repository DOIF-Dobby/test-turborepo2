'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { domMax, LazyMotion, motion, type MotionProps } from 'motion/react'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'

type Props = React.ComponentProps<typeof TabsPrimitive.List>

export interface TabsListProps extends Props {
  className?: string
}

export function TabsList(props: TabsListProps) {
  const { children, className, ref, ...otherProps } = props
  const context = useTabsContext()

  return (
    <TabsPrimitive.List
      ref={ref}
      className={swClsx(context.slots?.list({ className }))}
      {...otherProps}
    >
      {children}
      <LazyMotion features={domMax}>
        <TabsPrimitive.Indicator
          render={(props) => {
            return (
              <motion.span
                {...(props as MotionProps)}
                className={swClsx(context.slots?.indicator({}))}
                layoutId={`indicator-${context.tabsId}`}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )
          }}
        />
      </LazyMotion>
    </TabsPrimitive.List>
  )
}
