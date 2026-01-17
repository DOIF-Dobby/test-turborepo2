import { Label } from '@repo/ui/components/label'

const sizes = ['md', 'sm', 'xs'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-xs flex flex-col">
      {sizes.map((size) => (
        <Label key={size} size={size}>
          {size}
        </Label>
      ))}
    </div>
  )
}
