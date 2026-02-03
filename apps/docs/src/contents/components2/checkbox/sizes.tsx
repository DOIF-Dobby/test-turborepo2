import { Checkbox } from '@repo/ui/components2/checkbox'

const sizes = ['md', 'sm'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-md flex items-start">
      {sizes.map((size) => (
        <Checkbox key={size} size={size}>
          {size}
        </Checkbox>
      ))}
    </div>
  )
}
