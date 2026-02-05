import { Select } from '@repo/ui/components2/select'
import { AlarmClock, FuelIcon, MehIcon } from 'lucide-react'

export default function SelectItemStartContent() {
  return (
    <Select>
      <Select.Item
        value="value1"
        startContent={<FuelIcon className="size-5" />}
      >
        value1
      </Select.Item>
      <Select.Item
        value="value2"
        startContent={<AlarmClock className="size-5" />}
      >
        value2
      </Select.Item>
      <Select.Item value="value3" startContent={<MehIcon className="size-5" />}>
        value3
      </Select.Item>
    </Select>
  )
}
