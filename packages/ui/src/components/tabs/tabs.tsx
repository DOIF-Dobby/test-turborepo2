'use client'

import { useFallbackId } from '@repo/hooks/use-fallback-id'
import { Tabs as TabsPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { TabsContext } from './tabs-context'
import { type TabsSlots, type TabsVariants, tabsVariatns } from './variants'

type OmittedType = TabsVariants & {
  defaultValue: TabsPrimitive.TabsProps['defaultValue']
}
type Props = Omit<TabsPrimitive.TabsProps, keyof OmittedType> & TabsVariants

export interface TabsProps extends Props {
  value: TabsPrimitive.TabsProps['value']
  onValueChange: TabsPrimitive.TabsProps['onValueChange']
  classNames?: SlotsToClasses<TabsSlots>
}

export function Tabs(props: TabsProps) {
  const {
    children,
    className,
    classNames,
    variant,
    radius,
    value,
    id,
    ...otherProps
  } = props

  const tabsId = useFallbackId(id)
  const slots = tabsVariatns()

  const styles = slots.tabsRoot({
    className: swClsx(classNames?.tabsRoot, className),
  })

  return (
    <TabsContext
      value={{
        tabsId,
        classNames,
        variant,
        radius,
        value,
      }}
    >
      <TabsPrimitive.Root
        className={swClsx(styles)}
        value={value}
        {...otherProps}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext>
  )
}
