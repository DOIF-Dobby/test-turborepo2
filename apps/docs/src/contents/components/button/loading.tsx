import { Button } from '@repo/ui/components/button'

const variants = ['solid', 'bordered', 'light'] as const

export default function Loading() {
  return (
    <div className="flex gap-sw-sm">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} isLoading>
          Loading...
        </Button>
      ))}
    </div>
  )
}
