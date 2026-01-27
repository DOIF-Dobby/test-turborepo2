import { DateField } from '@repo/ui/components/date-field'

const sizes = ['md', 'sm', 'xs'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-sm flex">
      {sizes.map((size) => (
        <DateField
          key={size}
          size={size}
          label={`Size ${size}`}
          classNames={{ container: 'w-full' }}
        />
      ))}
    </div>
  )
}
