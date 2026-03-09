import { DateTimeField } from '@repo/ui/components/date-field'

const sizes = ['md', 'sm', 'xs'] as const

export default function Sizes() {
  return (
    <div className="flex gap-sw-sm">
      {sizes.map((size) => (
        <DateTimeField
          key={size}
          size={size}
          label={`Size ${size}`}
          classNames={{ container: 'w-full' }}
        />
      ))}
    </div>
  )
}
