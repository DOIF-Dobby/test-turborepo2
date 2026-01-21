import { Switch } from '@repo/ui/components/switch'

const colors = ['cta1', 'cta2', 'destructive'] as const

export default function Disabled() {
  return (
    <div className="gap-sw-sm flex flex-col">
      {colors.map((color) => (
        <div className="gap-sw-md flex" key={color}>
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
