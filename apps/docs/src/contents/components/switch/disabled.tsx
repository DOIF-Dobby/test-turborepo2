import { Switch } from '@repo/ui/components/switch'

const colors = ['cta1', 'cta2', 'destructive'] as const

export default function Disabled() {
  return (
    <div className="flex flex-col gap-sw-sm">
      {colors.map((color) => (
        <div className="flex gap-sw-md" key={color}>
          <Switch color={color} isDisabled>
            Disabled
          </Switch>
          <Switch color={color} isDisabled defaultChecked>
            Disabled
          </Switch>
        </div>
      ))}
    </div>
  )
}
