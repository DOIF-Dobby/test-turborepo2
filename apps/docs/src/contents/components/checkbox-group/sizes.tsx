import { Checkbox, CheckboxGroup } from '@repo/ui/components/checkbox'

const sizes = ['sm', 'md'] as const

export default function Sizes() {
  return (
    <div className="gap-sw-md flex flex-col">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col">
          <div>{size}</div>
          <CheckboxGroup size={size}>
            <Checkbox>Option 1</Checkbox>
            <Checkbox>Option 2</Checkbox>
            <Checkbox>Option 3</Checkbox>
          </CheckboxGroup>
        </div>
      ))}
    </div>
  )
}
