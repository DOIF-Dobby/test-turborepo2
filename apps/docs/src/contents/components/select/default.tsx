import { Select, SelectItem } from '@repo/ui/components/select'

export default function Default() {
  return (
    <Select label="Select">
      <SelectItem value="value1">value1</SelectItem>
      <SelectItem value="value2">value2</SelectItem>
      <SelectItem value="value3">value3</SelectItem>
    </Select>
  )
}
