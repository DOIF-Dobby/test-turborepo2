'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { useFallbackId } from '@repo/hooks/use-fallback-id'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { TabsContext } from './tabs-context'
import { type TabsSlots, type TabsVariants, tabsVariatns } from './variants'

type Props = Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  keyof TabsVariants
> &
  TabsVariants

export interface TabsProps extends Props {
  classNames?: SlotsToClasses<TabsSlots>
  clsssName?: string
  value?: string
  defaultValue?: string
  disableAnimation?: boolean
}

export function Tabs(props: TabsProps) {
  const {
    children,
    classNames,
    className,
    variant,
    radius,
    id,
    disableAnimation,
    ref,
    ...otherProps
  } = props

  const tabsId = useFallbackId(id)
  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const slots = tabsVariatns({
    radius,
    variant,
  })

  return (
    <TabsContext
      value={{
        tabsId,
        slots,
        variant,
        radius,
        value: '',
        disableAnimation: shouldDisableAnimation,
      }}
    >
      <TabsPrimitive.Root
        ref={ref}
        className={swClsx(
          slots.root({
            className: swClsx(classNames?.root, className),
          }),
        )}
        {...otherProps}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext>
  )
}
