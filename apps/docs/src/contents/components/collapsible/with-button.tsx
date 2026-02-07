import { Button } from '@repo/ui/components/button'
import { Collapsible } from '@repo/ui/components/collapsible'

export default function WithButton() {
  return (
    <Collapsible>
      <Collapsible.Trigger render={<Button>Trigger</Button>} />
      <Collapsible.Panel>Panel</Collapsible.Panel>
    </Collapsible>
  )
}
