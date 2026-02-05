import { Tabs as TabsRoot } from './tabs'
import { TabsList } from './tabs-list'
import { TabsPanel } from './tabs-panel'
import { TabsTab } from './tabs-tab'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
})
