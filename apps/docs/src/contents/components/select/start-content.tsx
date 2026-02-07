import { Select } from '@repo/ui/components/select'
import { FuelIcon } from 'lucide-react'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function StartContent() {
  return <Select startContent={<FuelIcon />} items={items} />
}
