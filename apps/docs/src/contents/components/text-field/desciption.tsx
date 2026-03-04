import { TextField } from '@repo/ui/components/text-field'

const sizes = ['md', 'sm', 'xs'] as const

export default function Description() {
  return (
    <div className="flex gap-sw-md">
      {sizes.map((size) => (
        <TextField
          key={size}
          classNames={{ container: 'w-1/3' }}
          label="Username"
          description="Enter your username"
          size={size}
        />
      ))}
    </div>
  )
}
