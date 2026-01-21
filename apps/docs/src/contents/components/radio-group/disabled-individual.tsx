import { Radio, RadioGroup } from '@repo/ui/components/radio-group'

export default function DisabledIndividual() {
  return (
    <RadioGroup>
      <Radio value="1" isDisabled>
        Option 1
      </Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3">Option 3</Radio>
    </RadioGroup>
  )
}
