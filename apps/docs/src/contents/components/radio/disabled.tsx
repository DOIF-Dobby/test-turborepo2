import { Radio, RadioGroup } from '@repo/ui/components/radio'

export default function Disabled() {
  return (
    <RadioGroup defaultValue="apple">
      <Radio value="apple" isDisabled>
        Apple
      </Radio>
      <Radio value="banana" isDisabled>
        Banana
      </Radio>
      <Radio value="orange">Orange</Radio>
    </RadioGroup>
  )
}
