import { Collapsible } from '@repo/ui/components2/collapsible'

export default function DefaultOpen() {
  return (
    <Collapsible defaultOpen>
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Panel>Panel</Collapsible.Panel>
    </Collapsible>
  )
}
