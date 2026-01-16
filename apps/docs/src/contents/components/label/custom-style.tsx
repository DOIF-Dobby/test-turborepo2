import { Label } from '@repo/ui/components/label'

export default function CustomStyle() {
  return (
    <Label
      requiredIndicator
      classNames={{
        label: 'text-red-500 text-xl',
        indicator: 'text-blue-500 text-4xl',
      }}
    >
      Label
    </Label>
  )
}
