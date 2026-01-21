import { Radio, RadioGroup } from '@repo/ui/components/radio-group'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-md flex flex-col">
      {sizes.map((size) => (
        <div key={size}>
          <div>{size}</div>
          <RadioGroup size={size}>
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
