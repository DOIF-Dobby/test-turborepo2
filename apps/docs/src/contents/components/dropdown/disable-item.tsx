import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'

export default function DisableItem() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Press me</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>item 1</DropdownItem>
        <DropdownItem disabled>item 2</DropdownItem>
        <DropdownItem>item 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
