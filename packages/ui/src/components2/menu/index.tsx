import { MenuCheckboxItem } from './menu-checkbox-item'
import { MenuContent } from './menu-content'
import { MenuGroup } from './menu-group'
import { MenuItem } from './menu-item'
import { MenuRadioGroup } from './menu-radio-group'
import { MenuRadioItem } from './menu-radio-item'
import { MenuRoot } from './menu-root'
import { MenuSubRoot } from './menu-sub-root'
import { MenuSubTrigger } from './menu-sub-trigger'
import { MenuTrigger } from './menu-trigger'

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  CheckboxItem: MenuCheckboxItem,
  Group: MenuGroup,
  Sub: MenuSubRoot,
  SubTrigger: MenuSubTrigger,
})
