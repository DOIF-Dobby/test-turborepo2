import { Select, SelectItem } from '@repo/ui/components/select'

const sizes = ['md', 'sm'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-md flex">
      {sizes.map((size) => (
        <Select label={size} size={size} key={size}>
          <SelectItem value="value1">value1</SelectItem>
          <SelectItem value="value2">value2</SelectItem>
          <SelectItem value="value3">value3</SelectItem>
        </Select>
      ))}
    </div>
  )
}
