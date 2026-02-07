import { Select } from '@repo/ui/components/select'

const sizes = ['md', 'sm'] as const

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function Sizes() {
  return (
    <div className="gap-sw-md flex">
      {sizes.map((size) => (
        <Select
          items={items}
          size={size}
          key={size}
          classNames={{
            container: 'w-1/2',
          }}
        />
      ))}
    </div>
  )
}
