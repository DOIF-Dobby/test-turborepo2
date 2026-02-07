import { Select } from '@repo/ui/components/select'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function DefaultValue() {
  return <Select defaultValue={['apple', 'banana']} multiple items={items} />
}
