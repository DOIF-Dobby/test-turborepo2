import { Button } from '@repo/ui/components/button'
import { Paragraph1 } from '@repo/ui/components/typography'

export default function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Paragraph1>cta1</Paragraph1>
        <div className="flex items-center gap-2">
          <Button variant="solid">Solid</Button>
          <Button variant="bordered">Bordered</Button>
          <Button variant="light">Light</Button>
        </div>
      </div>
      <div>
        <Paragraph1>cta2</Paragraph1>
        <div className="flex items-center gap-2">
          <Button color="cta2" variant="solid">
            Solid
          </Button>
          <Button color="cta2" variant="bordered">
            Bordered
          </Button>
          <Button color="cta2" variant="light">
            Light
          </Button>
        </div>
      </div>
      <div>
        <Paragraph1>destructive</Paragraph1>
        <div className="flex items-center gap-2">
          <Button color="destructive" variant="solid">
            Solid
          </Button>
          <Button color="destructive" variant="bordered">
            Bordered
          </Button>
          <Button color="destructive" variant="light">
            Light
          </Button>
        </div>
      </div>
    </div>
  )
}
