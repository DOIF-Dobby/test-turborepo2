import { Checkbox } from '@repo/ui/components/checkbox'

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
