import { Input } from '@repo/ui/components/input'

const sizes = ['md', 'sm', 'xs'] as const

export default function Sizes() {
  return sizes.map((size) => (
    <Input key={size} size={size} defaultValue={size} />
  ))
}
