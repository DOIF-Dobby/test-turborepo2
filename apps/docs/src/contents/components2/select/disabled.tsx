import { Select } from '@repo/ui/components2/select'

export default function Disabled() {
  return (
    <Select isDisabled>
      <Select.Item value="value1">value1</Select.Item>
      <Select.Item value="value2">value2</Select.Item>
      <Select.Item value="value3">value3</Select.Item>
    </Select>
  )
}
