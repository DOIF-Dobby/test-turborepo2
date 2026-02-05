'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'

type Props = React.ComponentProps<typeof TabsPrimitive.Panel>

export interface TabsPanelProps extends Props {
  className?: string
}

export function TabsPanel(props: TabsPanelProps) {
  const { children, className, ref, ...otherProps } = props
  const context = useTabsContext()

  const styles = context.slots?.panel({
    className: swClsx(className),
  })

  return (
    <TabsPrimitive.Panel
      ref={ref}
      className={swClsx(styles)}
      {...otherProps}
      suppressHydrationWarning
    >
      {children}
    </TabsPrimitive.Panel>
  )
}
