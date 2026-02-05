import { Select, SelectItem } from '@repo/ui/components/select'

export default function Default() {
  return (
    <Select label="Select">
      <SelectItem value="value1">값1</SelectItem>
      <SelectItem value="value2">값2</SelectItem>
      <SelectItem value="value3">값3</SelectItem>
    </Select>
  )
}
