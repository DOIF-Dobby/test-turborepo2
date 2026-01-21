import { Spinner, type SpinnerProps } from '@repo/ui/components/spinner'

const variants: SpinnerProps['variant'][] = ['dot', 'ring']
const colors: SpinnerProps['color'][] = ['cta1', 'cta2', 'destructive']

export default function Colors() {
  return (
    <div className="gap-sw-sm flex flex-col">
      {colors.map((color) => (
        <div className="gap-sw-xl flex" key={color}>
          {variants.map((variant) => (
            <div key={variant}>
              <div className="gap-sw-2xs flex items-center">
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
