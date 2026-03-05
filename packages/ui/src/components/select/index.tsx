import { SelectGroup } from './select-group'
import { SelectItem } from './select-item'
import { SelectRoot } from './select-root'

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
  Group: SelectGroup,
})

export type { DefaultSelectItem, SelectRootProps } from './select-root'
