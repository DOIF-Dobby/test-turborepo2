import { Select } from '@repo/ui/components2/select'

const sizes = ['md', 'sm'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-md flex">
      {sizes.map((size) => (
        <Select
          size={size}
          key={size}
          classNames={{
            container: 'w-1/2',
          }}
        >
          <Select.Item value="value1">value1</Select.Item>
          <Select.Item value="value2">value2</Select.Item>
          <Select.Item value="value3">value3</Select.Item>
        </Select>
      ))}
    </div>
  )
}
