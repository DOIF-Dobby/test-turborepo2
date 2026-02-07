import { Collapsible } from '@repo/ui/components/collapsible'

export default function DisableAnimation() {
  return (
    <Collapsible>
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Panel disableAnimation>Panel</Collapsible.Panel>
    </Collapsible>
  )
}
