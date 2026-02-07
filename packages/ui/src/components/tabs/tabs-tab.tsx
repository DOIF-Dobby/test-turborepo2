'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'

type Props = Omit<React.ComponentProps<typeof TabsPrimitive.Tab>, 'disabled'>

export interface TabsTabProps extends Props {
  value: string
  className?: string
  isDisabled?: boolean
}

export function TabsTab(props: TabsTabProps) {
  const { children, className, value, ref, isDisabled, ...otherProps } = props
  const context = useTabsContext()

  const triggerStyles = context.slots?.tab({
    className: swClsx(className),
  })

  return (
    <TabsPrimitive.Tab
      ref={ref}
      className={swClsx(triggerStyles)}
      value={value}
      disabled={isDisabled}
      {...otherProps}
      suppressHydrationWarning
    >
      {children}
    </TabsPrimitive.Tab>
  )
}
