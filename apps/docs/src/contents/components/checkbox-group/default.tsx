import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'

export default function Default() {
  return (
    <CheckboxGroup>
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="banana">Banana</Checkbox>
      <Checkbox value="orange">Orange</Checkbox>
    </CheckboxGroup>
  )
}
