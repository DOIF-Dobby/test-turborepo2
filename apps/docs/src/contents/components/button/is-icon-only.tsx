import { Button } from '@repo/ui/components/button'
import { Star } from 'lucide-react'

const sizes = ['3xs', '2xs', 'xs', 'sm', 'md'] as const

export default function IsIconOnly() {
  return (
    <div className="flex items-end gap-2">
      {sizes.map((size) => (
        <Button key={size} size={size} isIconOnly>
          <Star />
        </Button>
      ))}
    </div>
  )
}
