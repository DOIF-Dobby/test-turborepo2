'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
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
    </TabsPrimitive.List>
  )
}
