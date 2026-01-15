import { Button } from '@repo/ui/components/button'

export default function Sizes() {
  return (
    <div className="flex items-end gap-2">
      <Button size="3xs">3xs</Button>
      <Button size="2xs">2xs</Button>
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
    </div>
  )
}
