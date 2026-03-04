import { Switch } from '@repo/ui/components/switch'

const colors = ['cta1', 'cta2', 'destructive'] as const

export default function Colors() {
  return (
    <div className="flex items-start gap-sw-md">
      {colors.map((color) => (
        <Switch key={color} color={color}>
          {color}
        </Switch>
      ))}
    </div>
  )
}
