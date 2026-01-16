import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible'

export default function DisableAnimation() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Trigger</CollapsibleTrigger>
      <CollapsibleContent disableAnimation>Content</CollapsibleContent>
    </Collapsible>
  )
}
