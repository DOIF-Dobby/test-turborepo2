import { Checkbox, CheckboxGroup } from '@repo/ui/components2/checkbox'

export default function DefaultValue() {
  return (
    <CheckboxGroup defaultValue={['apple', 'banana']}>
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="banana">Banana</Checkbox>
      <Checkbox value="orange">Orange</Checkbox>
    </CheckboxGroup>
  )
}
