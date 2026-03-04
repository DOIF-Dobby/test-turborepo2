import { Spinner, type SpinnerProps } from '@repo/ui/components/spinner'

const variants: SpinnerProps['variant'][] = ['dot', 'ring']
const colors: SpinnerProps['color'][] = ['cta1', 'cta2', 'destructive']

export default function Colors() {
  return (
    <div className="flex flex-col gap-sw-sm">
      {colors.map((color) => (
        <div className="flex gap-sw-xl" key={color}>
          {variants.map((variant) => (
            <div key={variant}>
              <div className="flex items-center gap-sw-2xs">
                <Spinner variant={variant} color={color} />
                <span>{variant}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
