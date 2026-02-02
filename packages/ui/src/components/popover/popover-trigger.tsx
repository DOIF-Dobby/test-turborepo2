import { Popover as PopoverPrimitive } from 'radix-ui'
import { isValidElement } from 'react'

export function PopoverTrigger(props: PopoverPrimitive.PopoverTriggerProps) {
  const { children, asChild, ...triggerProps } = props

  const isChildElement = asChild || isValidElement(children)

  return (
    <PopoverPrimitive.Trigger {...triggerProps} asChild={isChildElement}>
      {children}
    </PopoverPrimitive.Trigger>
  )
}
