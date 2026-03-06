import { TimeField } from '@repo/ui/components/date-field'

const sizes = ['md', 'sm', 'xs'] as const

export default function Description() {
  return (
    <div className="flex gap-sw-sm">
      {sizes.map((size) => (
        <TimeField
          key={size}
          size={size}
          label="Time"
          description="This is description"
          classNames={{ container: 'w-full' }}
        />
      ))}
    </div>
  )
}
