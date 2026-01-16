import { createContext, use } from 'react'
import type { SlotsToClasses } from '../../types'
import type { TabsSlots, TabsVariants } from './variants'

type TabsContextType = {
  tabsId: string
  classNames?: SlotsToClasses<TabsSlots>
  variant?: TabsVariants['variant']
  radius?: TabsVariants['radius']
  value?: string
}

export const TabsContext = createContext<TabsContextType>({
  tabsId: '',
})

export const useTabsContext = () => use(TabsContext)
