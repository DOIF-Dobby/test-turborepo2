import { Select } from '@repo/ui/components2/select'

export default function ManyItems() {
  const items = Array.from({ length: 100 }, (_, i) => ({
    value: `value-${i + 1}`,
    label: `Item ${i + 1} 입니다`,
  }))

  return (
    <Select>
      {items.map((item) => (
        <Select.Item key={item.value} value={item.value}>
          {item.label}
        </Select.Item>
      ))}
    </Select>
  )
}
