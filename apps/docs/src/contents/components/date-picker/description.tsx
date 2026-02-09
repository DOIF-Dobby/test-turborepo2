import { DatePicker } from '@repo/ui/components/date-picker'

const sizes = ['md', 'sm', 'xs'] as const

export default function Description() {
  return (
    <div className="gap-sw-sm flex">
      {sizes.map((size) => (
        <div key={size} className="w-full">
          <DatePicker
            size={size}
            label="error field"
            description="This is an date picker"
          />
        </div>
      ))}
    </div>
  )
}
