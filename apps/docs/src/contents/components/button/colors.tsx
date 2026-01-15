import { Button } from '@repo/ui/components/button'

export default function Colors() {
  return (
    <div className="flex items-center gap-2">
      <Button color="cta1">CTA 1</Button>
      <Button color="cta2">CTA 2</Button>
      <Button color="destructive">Destructive</Button>
    </div>
  )
}
