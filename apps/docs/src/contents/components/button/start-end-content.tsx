import { Button } from '@repo/ui/components/button'
import { PlusCircleIcon } from 'lucide-react'

const variants = ['solid', 'bordered', 'light'] as const
const colors = ['cta1', 'cta2', 'destructive'] as const

export default function StartEndContent() {
  return (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <div key={color}>
          <div className="flex items-center gap-2">
            {variants.map((variant) => (
              <Button
                key={variant}
                color={color}
                variant={variant}
                startContent={<PlusCircleIcon />}
                endContent={<PlusCircleIcon />}
              >
                {variant}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
