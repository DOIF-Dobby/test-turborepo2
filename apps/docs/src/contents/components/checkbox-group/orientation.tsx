import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'

export default function Orientation() {
  return (
    <div className="gap-sw-md flex">
      <CheckboxGroup orientation="horizontal">
        <Checkbox value="value-1">Value 1</Checkbox>
        <Checkbox value="value-2">Value 2</Checkbox>
        <Checkbox value="value-3">Value 3</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup orientation="vertical">
        <Checkbox value="value-1">Value 1</Checkbox>
        <Checkbox value="value-2">Value 2</Checkbox>
        <Checkbox value="value-3">Value 3</Checkbox>
      </CheckboxGroup>
    </div>
  )
}
