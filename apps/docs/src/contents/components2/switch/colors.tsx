import { Switch } from '@repo/ui/components2/switch'

const colors = ['cta1', 'cta2', 'destructive'] as const

export default function Colors() {
  return (
    <div className="gap-sw-md flex items-start">
      {colors.map((color) => (
        <Switch key={color} color={color}>
          {color}
        </Switch>
      ))}
    </div>
  )
}
