import { Radio, RadioGroup } from '@repo/ui/components2/radio'

const orientations = ['horizontal', 'vertical'] as const

export default function Orientation() {
  return (
    <div className="gap-sw-md flex flex-col">
      {orientations.map((orientation) => (
        <div key={orientation}>
          <div>{orientation}</div>
          <RadioGroup orientation={orientation}>
            <Radio value="value-1">Value 1</Radio>
            <Radio value="value-2">Value 2</Radio>
            <Radio value="value-3">Value 3</Radio>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
