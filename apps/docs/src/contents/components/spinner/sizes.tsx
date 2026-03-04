import { Spinner, type SpinnerProps } from '@repo/ui/components/spinner'

const sizes: SpinnerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']
const variants: SpinnerProps['variant'][] = ['dot', 'ring']

export default function Sizes() {
  return (
    <div className="flex flex-col gap-sw-sm">
      {variants.map((variant) => (
        <div className="flex gap-sw-sm" key={variant}>
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-sw-xs">
              <Spinner size={size} variant={variant} />
              <span>{size}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
