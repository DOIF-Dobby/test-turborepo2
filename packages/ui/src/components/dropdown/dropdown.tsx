import { DropdownMenu as DropdownPrimitive } from 'radix-ui'

export function Dropdown(props: DropdownPrimitive.DropdownMenuProps) {
  return <DropdownPrimitive.Root {...props} />
}

export function DropdownGroup(props: DropdownPrimitive.DropdownMenuGroupProps) {
  return <DropdownPrimitive.Group {...props} />
}

export function DropdownSeparator(
  props: DropdownPrimitive.DropdownMenuSeparatorProps,
) {
  return <DropdownPrimitive.Separator {...props} />
}

export function DropdownLabel(props: DropdownPrimitive.DropdownMenuLabelProps) {
  return <DropdownPrimitive.Label {...props} />
}

export function DropdownCheckboxItem(
  props: DropdownPrimitive.DropdownMenuCheckboxItemProps,
) {
  return <DropdownPrimitive.CheckboxItem {...props} />
}

export function DropdownSub(props: DropdownPrimitive.DropdownMenuSubProps) {
  return <DropdownPrimitive.Sub {...props} />
}

export function DropdownSubTrigger(
  props: DropdownPrimitive.DropdownMenuSubTriggerProps,
) {
  return <DropdownPrimitive.SubTrigger {...props} />
}

export function DropdownSubContent(
  props: DropdownPrimitive.DropdownMenuSubContentProps,
) {
  return <DropdownPrimitive.SubContent {...props} />
}
