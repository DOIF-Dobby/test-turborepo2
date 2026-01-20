import { Select, SelectItem } from '@repo/ui/components/select'
import { FuelIcon } from 'lucide-react'

export default function StartContent() {
  return (
    <Select label="Select" startContent={<FuelIcon />}>
      <SelectItem value="value1">value1</SelectItem>
      <SelectItem value="value2">value2</SelectItem>
      <SelectItem value="value3">value3</SelectItem>
    </Select>
  )
}
