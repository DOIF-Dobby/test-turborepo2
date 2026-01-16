import { Button } from '@repo/ui/components/button'
import { Paragraph1 } from '@repo/ui/components/typography'

const variants = ['solid', 'bordered', 'light'] as const
const colors = ['cta1', 'cta2', 'destructive'] as const

export default function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <div key={color}>
          <Paragraph1>{color}</Paragraph1>
          <div className="flex items-center gap-2">
            {variants.map((variant) => (
              <Button key={variant} color={color} variant={variant} isDisabled>
                {variant}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
