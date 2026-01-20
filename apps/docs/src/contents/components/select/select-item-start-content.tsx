import { Select, SelectItem } from '@repo/ui/components/select'
import { AlarmClock, FuelIcon, MehIcon } from 'lucide-react'

export default function SelectItemStartContent() {
  return (
    <Select label="Select">
      <SelectItem value="value1" startContent={<FuelIcon className="size-5" />}>
        value1
      </SelectItem>
      <SelectItem
        value="value2"
        startContent={<AlarmClock className="size-5" />}
      >
        value2
      </SelectItem>
      <SelectItem value="value3" startContent={<MehIcon className="size-5" />}>
        value3
      </SelectItem>
    </Select>
  )
}
