'use client'

import { Tabs as TabsPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import { useTabsContext } from './tabs-context'
import { tabsVariatns } from './variants'

type Props = TabsPrimitive.TabsListProps

export interface TabsListProps extends Props {}

export function TabsList(props: TabsListProps) {
  const { className, ...otherProps } = props
  const context = useTabsContext()

  const slots = tabsVariatns()

  const styles = slots.tabList({
    className: swClsx(context.classNames?.tabList, className),
    size: context.size,
    variant: context.variant,
    radius: context.radius,
  })

  return <TabsPrimitive.TabsList className={swClsx(styles)} {...otherProps} />
}
