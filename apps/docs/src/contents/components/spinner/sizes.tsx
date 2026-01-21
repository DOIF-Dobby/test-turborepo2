import { Spinner, type SpinnerProps } from '@repo/ui/components/spinner'

const sizes: SpinnerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']
const variants: SpinnerProps['variant'][] = ['dot', 'ring']

export default function Sizes() {
  return (
    <div className="gap-sw-sm flex flex-col">
      {variants.map((variant) => (
        <div className="gap-sw-sm flex" key={variant}>
          {sizes.map((size) => (
            <div key={size} className="gap-sw-xs flex flex-col items-center">
              <Spinner size={size} variant={variant} />
              <span>{size}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
