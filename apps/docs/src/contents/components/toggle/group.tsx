import { Toggle, ToggleGroup } from '@repo/ui/components/toggle'

export default function Group() {
  return (
    <ToggleGroup defaultValue="toggle1">
      <Toggle value="toggle1">Toggle 1</Toggle>
      <Toggle value="toggle2">Toggle 2</Toggle>
      <Toggle value="toggle3">Toggle 3</Toggle>
    </ToggleGroup>
  )
}
