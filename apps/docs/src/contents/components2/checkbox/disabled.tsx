import { Checkbox } from '@repo/ui/components2/checkbox'

export default function Disabled() {
  return (
    <div className="gap-sw-md flex">
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox isDisabled checked>
        Disabled
      </Checkbox>
    </div>
  )
}
