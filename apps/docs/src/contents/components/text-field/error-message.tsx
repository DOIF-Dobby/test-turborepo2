import { TextField } from '@repo/ui/components/text-field'

const sizes = ['md', 'sm', 'xs'] as const

export default function ErrorMessage() {
  return (
    <div className="gap-sw-md flex">
      {sizes.map((size) => (
        <TextField
          key={size}
          size={size}
          label="Error field"
          errorMessage="error message"
        />
      ))}
    </div>
  )
}
