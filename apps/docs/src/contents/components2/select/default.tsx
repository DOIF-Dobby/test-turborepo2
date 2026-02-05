import { Select } from '@repo/ui/components2/select'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function Default() {
  return (
    <Select items={items}>
      {items.map((item) => (
        <Select.Item key={item.value} value={item.value}>
          {item.label}
        </Select.Item>
      ))}
    </Select>
  )
}
