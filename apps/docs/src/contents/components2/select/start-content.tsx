import { Select } from '@repo/ui/components2/select'
import { FuelIcon } from 'lucide-react'

export default function StartContent() {
  return (
    <Select startContent={<FuelIcon />}>
      <Select.Item value="value1">value1</Select.Item>
      <Select.Item value="value2">value2</Select.Item>
      <Select.Item value="value3">value3</Select.Item>
    </Select>
  )
}
