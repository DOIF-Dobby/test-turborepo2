import { Select } from '@repo/ui/components2/select'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function Clearable() {
  return (
    <div className="gap-sw-2xs flex">
      <Select
        isClearable
        classNames={{
          container: 'w-1/2',
        }}
        defaultValue="apple"
        items={items}
      />

      <Select
        isClearable={false}
        classNames={{
          container: 'w-1/2',
        }}
        defaultValue="apple"
        items={items}
      />
    </div>
  )
}
