import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'

export default function Disabled() {
  return (
    <CheckboxGroup isDisabled>
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <Checkbox>Option 3</Checkbox>
    </CheckboxGroup>
  )
}
