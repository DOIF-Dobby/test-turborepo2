import { Label } from '@repo/ui/components/label'

const sizes = ['md', 'sm', 'xs'] as const

export default function Sizes() {
  return sizes.map((size) => (
    <Label key={size} size={size}>
      {size}
    </Label>
  ))
}
