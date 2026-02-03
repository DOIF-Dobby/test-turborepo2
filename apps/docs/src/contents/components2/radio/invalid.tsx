import { Radio, RadioGroup } from '@repo/ui/components2/radio'

export default function Invaild() {
  return (
    <RadioGroup>
      <Radio value="1" isInvalid>
        Option 1
      </Radio>
      <Radio value="2" isInvalid>
        Option 2
      </Radio>
      <Radio value="3" isInvalid>
        Option 3
      </Radio>
    </RadioGroup>
  )
}
