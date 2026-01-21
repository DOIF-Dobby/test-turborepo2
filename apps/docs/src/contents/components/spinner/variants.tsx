import { Spinner, type SpinnerProps } from '@repo/ui/components/spinner'

const variants: SpinnerProps['variant'][] = ['dot', 'ring']

export default function Variants() {
  return (
    <div className="gap-sw-xl flex">
      {variants.map((variant) => (
        <div key={variant}>
          <div className="gap-sw-2xs flex items-center">
            <Spinner variant={variant} />
            <span>{variant}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
