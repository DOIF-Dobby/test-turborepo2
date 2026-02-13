import { ComboboxItem } from './combobox-item'
import { ComboboxRoot } from './combobox-root'

export const Combobox = Object.assign(ComboboxRoot, {
  Item: ComboboxItem,
})

export type { ComboboxRootProps, DefaultComboboxItem } from './combobox-root'
