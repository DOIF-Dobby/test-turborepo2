import { Switch } from '@repo/ui/components2/switch'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

export default function Default() {
  return (
    <div className="gap-sw-md flex items-start">
      {sizes.map((size) => (
        <Switch key={size} size={size}>
          {size}
        </Switch>
      ))}
    </div>
  )
}
