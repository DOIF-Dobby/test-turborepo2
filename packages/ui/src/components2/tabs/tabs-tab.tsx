'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { domMax, LazyMotion, m } from 'motion/react'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'

type Props = React.ComponentProps<typeof TabsPrimitive.Tab>

export interface TabsTabProps extends Props {
  className?: string
}

export function TabsTab(props: TabsTabProps) {
  const { children, className, value, ref, ...otherProps } = props
  const context = useTabsContext()

  const triggerStyles = context.slots?.tab({
    className: swClsx(className),
  })

  const cursorStyles = context.slots?.cursor({
    className: swClsx(className),
  })

  return (
    <TabsPrimitive.Tab
      ref={ref}
      className={swClsx(triggerStyles)}
      value={value}
      {...otherProps}
      suppressHydrationWarning
    >
      <div className="relative z-10">{children}</div>
      {context.value === value ? (
        <LazyMotion features={domMax}>
          <m.span
            className={cursorStyles}
            layoutId={`cursor-${context.tabsId}`}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        </LazyMotion>
      ) : null}
    </TabsPrimitive.Tab>
  )
}
