import { SelectItem } from './select-item'
import { SelectRoot } from './select-root'

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
})

export type { DefaultSelectItem, SelectRootProps } from './select-root'
