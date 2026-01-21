import { Button } from '@repo/ui/components/button'

const variants = ['solid', 'bordered', 'light'] as const

export default function Loading() {
  return (
    <div className="gap-sw-sm flex">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} isLoading>
          Loading...
        </Button>
      ))}
    </div>
  )
}
