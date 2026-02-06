import { MenuContent } from './menu-content'
import { MenuItem } from './menu-item'
import { MenuRoot } from './menu-root'
import { MenuTrigger } from './menu-trigger'

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
})
