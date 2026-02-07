import { Radio, RadioGroup } from '@repo/ui/components/radio'

export default function Default() {
  return (
    <RadioGroup>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange">Orange</Radio>
    </RadioGroup>
  )
}
