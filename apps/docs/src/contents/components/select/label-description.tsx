import { Select } from '@repo/ui/components/select'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function LabelDescription() {
  return (
    <Select
      items={items}
      label="과일 선택"
      description="과일을 선택해주세요."
    />
  )
}
