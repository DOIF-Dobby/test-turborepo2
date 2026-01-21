import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'

export default function Invalid() {
  return (
    <CheckboxGroup isInvalid>
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <Checkbox>Option 3</Checkbox>
    </CheckboxGroup>
  )
}
