'use client'

import { Tabs as TabsPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'
import { tabsVariatns } from './variants'

type Props = TabsPrimitive.TabsContentProps

export interface TabsContentProps extends Props {}

export function TabsContent(props: TabsContentProps) {
  const { className, ...otherProps } = props
  const context = useTabsContext()

  const slots = tabsVariatns()

  const styles = slots.tabContent({
    className: swClsx(context.classNames?.tabContent, className),
  })

  return (
    <TabsPrimitive.TabsContent
      className={swClsx(styles)}
      {...otherProps}
      suppressHydrationWarning
    />
  )
}
