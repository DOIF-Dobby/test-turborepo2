'use client'

import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'

export default function OnSelectItem() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Press me</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem onSelect={() => alert('item 1')}>item 1</DropdownItem>
        <DropdownItem onSelect={() => alert('item 2')}>item 2</DropdownItem>
        <DropdownItem onSelect={() => alert('item 3')}>item 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
