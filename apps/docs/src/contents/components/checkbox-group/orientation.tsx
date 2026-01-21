import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'

const orientations = ['horizontal', 'vertical'] as const

export default function Orientation() {
  return (
    <div className="gap-sw-md flex flex-col">
      {orientations.map((orientation) => (
        <div key={orientation}>
          <div>{orientation}</div>
          <CheckboxGroup orientation={orientation}>
            <Checkbox value="value-1">Value 1</Checkbox>
            <Checkbox value="value-2">Value 2</Checkbox>
            <Checkbox value="value-3">Value 3</Checkbox>
          </CheckboxGroup>
        </div>
      ))}
    </div>
  )
}
