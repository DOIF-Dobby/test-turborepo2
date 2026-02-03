import { Collapsible } from '@repo/ui/components2/collapsible'

export default function DisableAnimation() {
  return (
    <Collapsible>
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Panel disableAnimation>Panel</Collapsible.Panel>
    </Collapsible>
  )
}
