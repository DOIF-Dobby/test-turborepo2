import { CollapsiblePanel } from './collapsible-panel'
import { CollapsibleRoot } from './collapsible-root'
import { CollapsibleTrigger } from './collapsible-trigger'

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Panel: CollapsiblePanel,
})
