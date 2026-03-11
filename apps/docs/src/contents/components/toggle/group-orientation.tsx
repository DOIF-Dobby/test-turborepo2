import { Toggle, ToggleGroup } from '@repo/ui/components/toggle'

export default function Group() {
  return (
    <div className="flex gap-sw-md">
      <ToggleGroup defaultValue={['toggle1']} orientation="horizontal">
        <Toggle value="toggle1">Toggle 1</Toggle>
        <Toggle value="toggle2">Toggle 2</Toggle>
        <Toggle value="toggle3">Toggle 3</Toggle>
      </ToggleGroup>

      <ToggleGroup defaultValue={['toggle1']} orientation="vertical">
        <Toggle value="toggle1">Toggle 1</Toggle>
        <Toggle value="toggle2">Toggle 2</Toggle>
        <Toggle value="toggle3">Toggle 3</Toggle>
      </ToggleGroup>
    </div>
  )
}
