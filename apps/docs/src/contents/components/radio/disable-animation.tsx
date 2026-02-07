import { Radio, RadioGroup } from '@repo/ui/components/radio'

export default function DisableAnimation() {
  return (
    <RadioGroup>
      <Radio value="1" disableAnimation>
        Option 1
      </Radio>
      <Radio value="2" disableAnimation>
        Option 2
      </Radio>
      <Radio value="3" disableAnimation>
        Option 3
      </Radio>
    </RadioGroup>
  )
}
