import { Select } from '@repo/ui/components2/select'

export default function DefaultValue() {
  return (
    <Select
      defaultValue="value1"
      items={[
        { value: 'value1', label: 'value1' },
        { value: 'value2', label: 'value2' },
        { value: 'value3', label: 'value3' },
      ]}
    >
      <Select.Item value="value1">value1</Select.Item>
      <Select.Item value="value2">value2</Select.Item>
      <Select.Item value="value3">value3</Select.Item>
    </Select>
  )
}
