import { Spinner, type SpinnerProps } from '@repo/ui/components/spinner'

const variants: SpinnerProps['variant'][] = ['dot', 'ring']

export default function Variants() {
  return (
    <div className="flex gap-sw-xl">
      {variants.map((variant) => (
        <div key={variant}>
          <div className="flex items-center gap-sw-2xs">
            <Spinner variant={variant} />
            <span>{variant}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
