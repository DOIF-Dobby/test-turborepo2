import { Button } from '@repo/ui/components/button'
import { Collapsible } from '@repo/ui/components2/collapsible'

export default function WithButton() {
  return (
    <Collapsible>
      <Collapsible.Trigger render={<Button>Trigger</Button>} />
      <Collapsible.Panel>Panel</Collapsible.Panel>
    </Collapsible>
  )
}
