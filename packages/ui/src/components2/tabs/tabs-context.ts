import { createContext, use } from 'react'
import type { TabsVariants, tabsVariatns } from './variants'

type TabsContextType = {
  tabsId: string
  slots?: ReturnType<typeof tabsVariatns>
  variant?: TabsVariants['variant']
  radius?: TabsVariants['radius']
  value?: string
}

export const TabsContext = createContext<TabsContextType>({
  tabsId: '',
})

export const useTabsContext = () => use(TabsContext)
