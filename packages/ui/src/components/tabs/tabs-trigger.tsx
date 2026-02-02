'use client'

import { domMax, LazyMotion, m } from 'motion/react'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'
import { tabsVariatns } from './variants'

type Props = React.ComponentProps<typeof TabsPrimitive.Trigger>

export interface TabsTriggerProps extends Props {}

export function TabsTrigger(props: TabsTriggerProps) {
  const { children, className, value, ref, ...otherProps } = props
  const context = useTabsContext()

  const slots = tabsVariatns()

  const triggerStyles = slots.tabTrigger({
    className: swClsx(context.classNames?.tabTrigger, className),
  })

  const cursorStyles = slots.cursor({
    className: swClsx(context.classNames?.cursor, className),
    variant: context.variant,
    radius: context.radius,
  })

  return (
    <TabsPrimitive.TabsTrigger
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
    </TabsPrimitive.TabsTrigger>
  )
}
