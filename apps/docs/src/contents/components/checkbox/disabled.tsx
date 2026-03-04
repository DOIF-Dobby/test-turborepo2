import { Checkbox } from '@repo/ui/components/checkbox'

export default function Disabled() {
  return (
    <div className="flex gap-sw-md">
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox isDisabled checked>
        Disabled
      </Checkbox>
    </div>
  )
}
