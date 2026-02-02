import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { isValidElement } from 'react'

export function DropdownTrigger(
  props: DropdownPrimitive.DropdownMenuTriggerProps,
) {
  const { children, asChild, ...triggerProps } = props

  const isChildElement = asChild || isValidElement(children)

  return (
    <DropdownPrimitive.Trigger {...triggerProps} asChild={isChildElement}>
      {children}
    </DropdownPrimitive.Trigger>
  )
}
