import { Radio, RadioGroup } from '@repo/ui/components2/radio'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-md flex flex-col">
      {sizes.map((size) => (
        <div key={size}>
          <div>{size}</div>
          <RadioGroup>
            <Radio value="1" size={size}>
              Option 1
            </Radio>
            <Radio value="2" size={size}>
              Option 2
            </Radio>
            <Radio value="3" size={size}>
              Option 3
            </Radio>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
