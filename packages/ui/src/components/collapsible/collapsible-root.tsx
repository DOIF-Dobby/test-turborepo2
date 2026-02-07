'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

export interface CollapsibleRootProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Root
> {}

export function CollapsibleRoot(props: CollapsibleRootProps) {
  const { children, ...otherProps } = props

  return (
    <CollapsiblePrimitive.Root {...otherProps}>
      {children}
    </CollapsiblePrimitive.Root>
  )
}
