'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

export interface CollapsibleTriggerProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
> {}

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  const { children, ...otherProps } = props

  return (
    <CollapsiblePrimitive.Trigger {...otherProps} suppressHydrationWarning>
      {children}
    </CollapsiblePrimitive.Trigger>
  )
}
