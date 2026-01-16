import { Button } from '@repo/ui/components/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible'

export default function WithButton() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button>Trigger</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
