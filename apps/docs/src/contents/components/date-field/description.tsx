import { DateField } from '@repo/ui/components/date-field'

const sizes = ['md', 'sm', 'xs'] as const

export default function Description() {
  return (
    <div className="gap-sw-sm flex">
      {sizes.map((size) => (
        <DateField
          key={size}
          size={size}
          label="Error field"
          description="This is description"
          classNames={{ container: 'w-full' }}
        />
      ))}
    </div>
  )
}
