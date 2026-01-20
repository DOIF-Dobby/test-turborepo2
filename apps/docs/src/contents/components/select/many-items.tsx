import { Select, SelectItem } from '@repo/ui/components/select'

export default function ManyItems() {
  const items = Array.from({ length: 100 }, (_, i) => ({
    value: `value-${i + 1}`,
    label: `Item ${i + 1} 입니다`,
  }))

  return (
    <Select label="Select">
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}
